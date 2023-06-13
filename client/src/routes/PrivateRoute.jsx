import { Navigate, useLocation } from 'react-router-dom';
import { FullLoader } from '../components/Loader';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return <FullLoader />;
  }

  if (user) return children;

  return <Navigate to='/login' state={{ from: location }} />;
};

export default PrivateRoute;
