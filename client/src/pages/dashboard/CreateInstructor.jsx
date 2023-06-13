import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import { AuthContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2';
import { AiFillEye } from 'react-icons/ai';
import { FullLoader, Loader } from '../../components/Loader';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_API_KEY
  }`;

  if (loading) return <Loader />;

  const handleRegister = async ({
    confirmPassword,
    email,
    gender,
    name,
    password,
    phone,
    image,
    address,
  }) => {
    setLoading(true);
    const body = {
      displayName: name,
      email,
      password,
      gender,
      phone,
      address,
      photoURL: '',
      role: 'INSTRUCTOR',
    };
    //password validation
    if (password !== confirmPassword) {
      Swal.fire(
        'Password does not match!',
        'Must Provide the same password as confirm password!',
        'error'
      );
      return;
    }
    if (password.length < 6) {
      Swal.fire(
        'Password is to short!',
        'Password must contain 6 characters!',
        'error'
      );
      return;
    }
    if (!/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])/.test(password)) {
      Swal.fire(
        'Weak Password!',
        'Password must contain a uppercase letter,a lowercase letter and a special character!',
        'error'
      );
      return;
    }

    if (image.length > 0) {
      const formData = new FormData();
      formData.append('image', image[0]);

      const res = await fetch(url, { method: 'POST', body: formData });
      const imgRes = await res.json();

      body.photoURL = imgRes.data.display_url;
    } else {
      body.photoURL = '';
    }
    registerUser(body);
    reset();
    setLoading(false);
  };

  console.log(loading);

  return (
    <>
      <div className='flex items-center justify-center py-5'>
        <div className='w-full max-w-3xl border-2 border-gray-400 p-6 rounded bg-white text-gray-200 shadow-md'>
          <form onSubmit={handleSubmit(handleRegister)} className='mb-1'>
            <div className='grid md:grid-cols-2 gap-x-5 gap-y-1'>
              <div className='mb-1'>
                <label
                  className='block text-sm font-bold text-gray-700'
                  htmlFor='name'
                >
                  Name*
                </label>
                <input
                  className={`${
                    errors['name'] && 'border-red-600'
                  } shadow border rounded w-full py-2 px-3  bg-white text-slate-900`}
                  id='name'
                  type='text'
                  name='name'
                  {...register('name', { required: true })}
                  placeholder='Enter your name'
                />
                {errors['name'] && (
                  <p className='text-red-600'>Must Provide Your Name!</p>
                )}
              </div>
              <div className='mb-1'>
                <label
                  className='block text-sm font-bold text-gray-700'
                  htmlFor='email'
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
                  <p className='text-red-600'>Must Provide Your Email!</p>
                )}
              </div>
              <div className='mb-2 relative'>
                <label
                  className='block text-sm font-bold text-gray-700'
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
              <div className='mb-2 relative'>
                <label
                  className='block text-sm font-bold text-gray-700'
                  htmlFor='confirmPassword'
                >
                  Confirm Password*
                </label>
                <input
                  className={`${
                    errors['confirmPassword'] && 'border-red-600'
                  } shadow border rounded w-full py-2 px-3  bg-white text-slate-900`}
                  id='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  {...register('confirmPassword', { required: true })}
                  placeholder='Confirm Password!'
                />
                <button
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  type='button'
                  className='text-slate-700 text-2xl absolute right-3 top-7 z-10'
                >
                  <AiFillEye />
                </button>
                {errors['confirmPassword'] && (
                  <p className='text-red-600'>Must Provide Confirm Password!</p>
                )}
              </div>
              <div className='mb-2'>
                <label
                  className='block text-sm font-bold text-gray-700'
                  htmlFor='confirmPassword'
                >
                  Phone
                </label>
                <input
                  className={`${
                    errors['phone'] && 'border-red-600'
                  } shadow border rounded w-full py-2 px-3  bg-white text-slate-900`}
                  id='phone'
                  type='text'
                  name='phone'
                  {...register('phone')}
                  placeholder='Phone!'
                />
              </div>
              <div className='mb-2'>
                <label
                  className='block text-sm font-bold text-gray-700'
                  htmlFor='gender'
                >
                  Gender
                </label>
                <select
                  className={`${
                    errors['gender'] && 'border-red-600'
                  } shadow border rounded w-full py-2 px-3  bg-white text-slate-900`}
                  id='gender'
                  type='gender'
                  name='gender'
                  defaultValue=''
                  {...register('gender')}
                >
                  <option value='' disabled>
                    Choose One
                  </option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </select>
              </div>
              <div className='mb-2'>
                <label
                  className='block text-sm font-bold text-gray-700'
                  htmlFor='address'
                >
                  Your address
                </label>
                <input
                  type='text'
                  className='shadow border rounded w-full py-2 px-3  bg-white text-slate-900'
                  id='address'
                  name='address'
                  {...register('address')}
                  placeholder='Your address!'
                />
              </div>
              <div className='mb-2'>
                <label
                  className='block text-sm font-bold text-gray-700'
                  htmlFor='photoURL'
                >
                  Your Image
                </label>
                <input
                  type='file'
                  className='shadow border rounded w-full py-2 px-3  bg-white text-slate-900'
                  id='photoURL'
                  name='photoURL'
                  {...register('image')}
                  placeholder='Your Photo!'
                />
              </div>
            </div>
            <div>
              <div className='flex items-center justify-center mt-3'>
                <Button type='submit'>Add Instructor</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
