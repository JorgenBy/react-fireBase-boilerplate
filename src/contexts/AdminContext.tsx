import React, { useContext, useState } from 'react';
import { functions, auth } from '../firebase';
import { httpsCallable } from 'firebase/functions';
import { useToast, EToastTypes } from './ToastContext';
import {
  HandleUserClaimsResponse,
  FunctionsError,
} from '../../shared/types/types';

interface IApiProviderProps {
  children: JSX.Element;
}

const AdminContext = React.createContext({});

export function useAdmin(): any {
  return useContext(AdminContext);
}

const listUsersFnc = httpsCallable(functions, 'listusers');
const approveUserFnc = httpsCallable(functions, 'setApprovedClaim');
const rejectUserFnc = httpsCallable(functions, 'rejectUser');

export function AdminProvider({ children }: IApiProviderProps): JSX.Element {
  const [allUsers, setAllUsers] = useState<Object | null>(null);
  const [loading, setLoading] = useState(true);

  const { showTypedToast, showError } = useToast();

  const listUsers = async () => {
    try {
      await listUsersFnc().then((result) => {
        const data = result.data as Object;
        setAllUsers(data);
        setLoading(false);
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const approveUser = async (usersEmail: string) => {
    try {
      const data = { email: usersEmail };
      await approveUserFnc(data).then((result) => {
        const data = result.data as HandleUserClaimsResponse;
        showTypedToast(EToastTypes.INFO, data.message);
        listUsers();
      });
    } catch (error) {
      const receivedError = error as FunctionsError;
      console.error('Error approving users:', receivedError.message);
      showError(receivedError?.message, receivedError?.code);
    }
  };

  const rejectUser = async (usersEmail: string) => {
    try {
      await rejectUserFnc({ email: usersEmail }).then((result) => {
        const data = result.data as HandleUserClaimsResponse;
        showTypedToast(EToastTypes.INFO, data.message);
        listUsers();
      });
    } catch (error) {
      console.error('Error approving users:', error);
    }
  };

  const createAdmin = async (usersEmail: string) => {
    console.log(usersEmail);
    showTypedToast(EToastTypes.WARNING, 'Function is not implemented');
  };

  const value = {
    listUsers,
    approveUser,
    rejectUser,
    createAdmin,
    allUsers,
    loading,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
