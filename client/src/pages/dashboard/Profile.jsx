import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import useAuth from '../../hooks/useAuth';
import { Loader } from '../../components/Loader';
import demo from '../../assets/demo.png';

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <div className=''>
      <div className='max-w-xl mx-auto flex flex-col items-center p-10 border border-slate-700 rounded-md'>
        <div className='w-40 h-40 rounded-full border-2 border-slate-800'>
          {user.photoURL ? (
            <img
              src={user?.photoURL}
              alt={user.displayName}
              className='w-full h-full object-cover rounded-full'
            />
          ) : (
            <img
              src={demo}
              alt={user.displayName}
              className='w-full h-full object-cover rounded-full'
            />
          )}
        </div>
        <div className='flex flex-col items-center mt-2'>
          <h1 className='bg-slate-700 text-white px-20 rounded'>
            {user.displayName}
          </h1>
          <h1>Email: {user.email}</h1>
          <h2 className='bg-blue-500 rounded-full px-5 py-1 font-semibold text-white text-sm'>
            {user.role}
          </h2>
        </div>
        <div className='flex flex-col items-center mt-4 capitalize'>
          <h1>Phone Number: {user.phone}</h1>
          <h1>Address: {user.address}</h1>
          <h1>Gender: {user.gender}</h1>
          <br />
          <Link to={`/dashboard/update-profile`}>
            <Button>Update Profile</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
