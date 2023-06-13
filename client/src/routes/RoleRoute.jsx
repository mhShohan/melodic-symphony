import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import { baseUrl } from '../utils/config';

const RoleRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/user/admin`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            authorization: `Barer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();

        if (data.isAdmin) {
          setIsAdmin(true);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, []);

  if (loading) {
    return <Loader full={true} />;
  }

  if (isAdmin) return children;

  return (
    <Navigate to='/login' state={{ from: location }} replace={true}></Navigate>
  );
};

export default RoleRoute;
