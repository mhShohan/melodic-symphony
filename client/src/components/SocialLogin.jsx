import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';
import { baseUrl } from '../utils/config';

const SocialLogin = () => {
  const { googleLogin, setLoading, setUpdate } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const handleGoogleLogin = () => {
    googleLogin()
      .then((currUser) => {
        const { displayName, email, photoURL } = currUser.user;

        axios
          .post(`${baseUrl}/user/social-login`, {
            displayName,
            email,
            photoURL,
          })
          .then((res) => {
            if (!res.data.error) {
              localStorage.setItem('token', res.data.token);
              navigate(from, { replace: true });
              Swal.fire({ icon: 'success', title: 'Successfully Login' });
              setLoading(false);
              setUpdate(true);
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        if (
          error.message.includes('Firebase: Error (auth/popup-closed-by-user).')
        ) {
          setLoading(false);
          return;
        }
      });
  };

  return (
    <div className='flex items-center justify-between flex-col gap-2 mt-4'>
      <button
        className='flex items-center gap-2 bg-green-800 hover:bg-cyan-600 transition-all text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        onClick={handleGoogleLogin}
      >
        <FaGoogle />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
