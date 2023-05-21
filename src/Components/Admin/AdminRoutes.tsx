import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import DashNavbar from '../DashNavbar';
import IncorrectAccessPanel from '../IncorrectAccessPanel';

export default function AdminRoutes() {
  const { currentUser, userInfo } = useAuth();

  return currentUser ? (
    userInfo.isAdmin ? (
      <>
        <DashNavbar />
        <Outlet />
      </>
    ) : (
      <>
        <DashNavbar />
        <IncorrectAccessPanel message="You have to be an Admin to access this page." />
      </>
    )
  ) : (
    <Navigate to="/login" />
  );
}
