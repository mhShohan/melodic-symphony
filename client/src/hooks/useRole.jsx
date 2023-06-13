import { useEffect, useState } from 'react';
import useAuth from './useAuth';

const useRole = () => {
  const { loading, user } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(user?.role);
  }, [loading]);

  return role;
};

export default useRole;
