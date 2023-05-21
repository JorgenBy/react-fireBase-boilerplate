import UsersList from './UsersList';
import { useEffect } from 'react';
import { useAdmin } from '../../contexts/AdminContext';

const AdminPanel = () => {
  const { listUsers, allUsers, loading, approveUser, rejectUser, createAdmin } =
    useAdmin();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await listUsers();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <UsersList
      users={allUsers}
      approveUser={approveUser}
      rejectUser={rejectUser}
      makeAdmin={createAdmin}
    />
  );
};

export default AdminPanel;
