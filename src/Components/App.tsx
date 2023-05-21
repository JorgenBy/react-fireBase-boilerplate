import Signup from './Authentication/Signup';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Authentication/Login';
import PrivateRoutes from './PrivateRoutes';
import ForgotPassword from './Authentication/ForgotPassword';
import UpdateProfile from './UpdateProfile';
import Projects from './Projects';
import { ToastProvider } from '../contexts/ToastContext';
import { ApiProvider } from '../contexts/ApiContext';
import { AdminProvider } from '../contexts/AdminContext';
import 'react-toastify/dist/ReactToastify.min.css';
import AppContextProviders from '../contexts/AppContextProvider';
import AdminRoutes from './Admin/AdminRoutes';
import AdminPanel from './Admin/AdminPanel';

function App() {
  const providers = [ToastProvider, AuthProvider, ApiProvider, AdminProvider];
  return (
    <Router>
      <AppContextProviders components={providers}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/" />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="projects" element={<Projects />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route element={<AdminPanel />} path="/adminpanel" />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AppContextProviders>
    </Router>
  );
}

export default App;
