import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeadTitle from '../components/HeadTitle';
import Button from '../components/Button';
import SocialLogin from '../components/SocialLogin';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';
import { baseUrl } from '../utils/config';
import { AiFillEye } from 'react-icons/ai';

const Login = () => {
  const { logIn, setLoading, setUpdate } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    if (data.password.length < 6) {
      Swal.fire({ icon: 'error', title: 'Password Must Have 6 Characters!' });
      return;
    } else {
      logIn(data)
        .then(() => {
          axios
            .post(`${baseUrl}/user/login`, data)
            .then((res) => {
              localStorage.setItem('token', res.data.token);

              Swal.fire({ icon: 'success', title: 'Login Successfully!' });
              navigate(from, { replace: true });
              setUpdate((p) => !p);
              setLoading(false);
              reset();
            })
            .catch((error) => {
              setLoading(false);
              console.log(error);
            });
        })
        .catch((err) => {
          if (err.message === 'Firebase: Error (auth/wrong-password).') {
            Swal.fire({ icon: 'error', title: 'Invalid Credential!' });
          }
          if (err.message === 'Firebase: Error (auth/user-not-found).') {
            Swal.fire({ icon: 'error', title: 'Invalid User Email!' });
          }
          setLoading(false);
          return;
        });
    }
  };

  return (
    <>
      <HeadTitle>Login</HeadTitle>
      <div className='flex items-center justify-center py-10 dark:bg-slate-700 bg-slate-400'>
        <div className='w-full max-w-sm border-2 border-gray-400 p-6 rounded bg-white shadow-md'>
          <form onSubmit={handleSubmit(handleLogin)} className='mb-4'>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold'
                htmlFor='password'
              >
                Email*
              </label>
              <input
                className={`${
                  errors['email'] && 'border-red-600'
                } shadow border rounded w-full py-2 px-3  bg-white text-slate-900`}
                id='email'
                type='email'
                name='email'
                {...register('email', { required: true })}
                placeholder='Enter your email'
              />
              {errors['email'] && (
                <p className='text-red-600'>Must Provide Email!</p>
              )}
            </div>
            <div className='mb-6 relative'>
              <label
                className='block text-gray-700 text-sm font-bold'
                htmlFor='password'
              >
                Password*
              </label>
              <input
                className={`${
                  errors['password'] && 'border-red-600'
                } shadow border rounded w-full py-2 px-3  bg-white text-slate-900`}
                id='password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                {...register('password', { required: true })}
                placeholder='Enter your password'
              />
              <button
                onClick={() => setShowPassword((p) => !p)}
                type='button'
                className='text-slate-700 text-2xl absolute right-3 top-7 z-10'
              >
                <AiFillEye />
              </button>
              {errors['password'] && (
                <p className='text-red-600'>Must Provide Password!</p>
              )}
            </div>
            <div className='flex items-center justify-center'>
              <Button type='submit'>Login</Button>
            </div>
            <p className='text-center font-semibold text-slate-800 mt-2'>
              Don't have any account?{' '}
              <Link to='/register' className='text-blue-700'>
                Register Here
              </Link>
            </p>
          </form>
          <div className='divider'>
            <span className='divider-text'>or</span>
          </div>
          <SocialLogin />
        </div>
      </div>
    </>
  );
};

export default Login;
