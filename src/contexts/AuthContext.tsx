import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { User as FirebaseUser } from 'firebase/auth';
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import { ProfileUpdateObject, UserInfo } from '../../shared/types/types';

interface IAuthProviderProps {
  children: JSX.Element;
}

const AuthContext = React.createContext({});

export function useAuth(): any {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: IAuthProviderProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>();

  function signup(email: string, password: string): Promise<any> {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function googleSignin(): Promise<any> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function githubSignin(): Promise<any> {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function login(email: string, password: string): Promise<any> {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout(): Promise<any> {
    setCurrentUser(null);
    return auth.signOut();
  }

  function resetPassword(email: string): Promise<any> {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email: string): Promise<any> {
    return currentUser.updateEmail(email);
  }

  function updateProfile(data: ProfileUpdateObject): Promise<any> {
    return currentUser.updateProfile(data);
  }

  function updatePassword(password: string): Promise<any> {
    return currentUser.updatePassword(password);
  }

  const getCurrentUserToken = async () => {
    if (currentUser) {
      const userToken = await currentUser.getIdToken();
      return userToken;
    }
    return null;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        const tokenResult = await user.getIdTokenResult();
        setUserInfo({
          firebaseUser: user as FirebaseUser,
          isAdmin: tokenResult.claims.admin,
          isApproved: tokenResult.claims.approved,
        });
      } else {
        setUserInfo({
          firebaseUser: null,
          isAdmin: false,
          isApproved: false,
        });
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userInfo,
    loading,
    login,
    signup,
    googleSignin,
    githubSignin,
    logout,
    resetPassword,
    updateEmail,
    updateProfile,
    updatePassword,
    getCurrentUserToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
