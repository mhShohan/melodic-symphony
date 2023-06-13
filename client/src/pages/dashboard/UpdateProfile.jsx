import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { Loader } from '../../components/Loader';
import useAxios from '../../hooks/useAxios';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user, loading, setLoading, setUpdate } = useAuth();
  const axiosSecure = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_API_KEY
  }`;
  const handleRegister = async ({
    email,
    gender,
    name,
    phone,
    image,
    address,
  }) => {
    const body = {
      displayName: name,
      email,
      gender,
      phone,
      address,
      photoURL: '',
    };

    if (image.length > 0) {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', image[0]);

      const res = await fetch(url, { method: 'POST', body: formData });
      const imgRes = await res.json();

      body.photoURL = imgRes.data.display_url;
    } else {
      body.photoURL = user.photoURL;
    }
    const res = await axiosSecure.patch('/user', body);

    if (!res.data.error) {
      reset();
      navigate('/dashboard/profile', { replace: true });
      Swal.fire({ icon: 'success', title: 'User Updated Successfully' });
      setLoading(false);
      setUpdate((p) => !p);
    } else {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className='flex items-center justify-center py-5 '>
        <div className='w-full max-w-3xl border-2 border-gray-400 p-6 rounded bg-white text-gray-200 shadow-md'>
          <h1 className='text-3xl text-slate-700 mb-5 text-center border-b-2 pb-2'>
            Update Profile
          </h1>
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
                  defaultValue={user.displayName}
                  name='name'
                  {...register('name', { required: true })}
                  placeholder='Enter your name'
                />
                {errors['name'] && (
                  <p className='text-red-600'>Must Provide Your Name!</p>
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
                  defaultValue={user.phone}
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
                  defaultValue={user.gender}
                  name='gender'
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
                  defaultValue={user.address}
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
            <div className='center mt-5'>
              <Button type='submit'>Update</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
