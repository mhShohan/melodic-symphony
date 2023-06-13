import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className='flex items-center justify-center bg-slate-900 min-h-screen'>
      <div className='bg-zinc-300 max-w-lg mx-auto p-8 rounded shadow-md text-center'>
        <h1 className='text-3xl text-red-600 font-bold mb-6'>404 Not Found!</h1>
        <p className='text-gray-700 mb-6'>
          The page you are looking for could not be found. Please check the URL
          or go back to the homepage.
        </p>
        <Link to='/'>
          <Button>Go Back to Homepage</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
