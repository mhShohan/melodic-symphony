import { Navigate, useLocation } from 'react-router-dom';
import { FullLoader } from '../components/Loader';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return <FullLoader />;
  }

  if (user.role === 'STUDENT') {
    return children;
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Students Only!',
      text: 'Not Allowed For ADMIN or INSTRUCTOR',
    });
  }

  return (
    <Navigate to='/login' state={{ from: location }} replace={true}></Navigate>
  );
};

export default StudentRoute;
