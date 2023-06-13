import { Navigate, useLocation } from 'react-router-dom';
import { FullLoader } from '../components/Loader';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const InstructorRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) return <FullLoader />;

  if (user.role === 'INSTRUCTOR') {
    return children;
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'INSTRUCTOR Only!',
    });
  }

  return (
    <Navigate to='/login' state={{ from: location }} replace={true}></Navigate>
  );
};

export default InstructorRoute;
