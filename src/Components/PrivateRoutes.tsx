import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashNavbar from './DashNavbar';
import IncorrectAccessPanel from './IncorrectAccessPanel';

export default function PrivateRoutes() {
  const { currentUser, userInfo } = useAuth();

  return currentUser ? (
    userInfo.isApproved ? (
      <>
        <DashNavbar />
        <Outlet />
      </>
    ) : (
      <>
        <DashNavbar />
        <IncorrectAccessPanel message="You have not been approved yet. Please contact the site Admin" />
      </>
    )
  ) : (
    <Navigate to="/login" />
  );
}
