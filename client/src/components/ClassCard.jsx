import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { Fade } from 'react-awesome-reveal';

const ClassCard = ({ item }) => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    (async () => {
      const isAlreadyEnrolled = await axiosSecure.get(
        `/payments/exist/${item._id}`
      );

      if (!isAlreadyEnrolled.data) {
        setIsEnrolled(true);
      } else {
        setIsEnrolled(false);
      }
    })();
  }, []);
  return (
    <Fade duration={3000}>
      <div
        className={`p-5 scale_up border-2 text-center dark:border-cyan-700 border-slate-700 rounded-lg ${
          item.seat === item.enrolled ? 'bg-red-900' : ''
        }`}
      >
        <div className='h-60 w-full'>
          <img
            src={item.photo}
            alt='shohan'
            className='w-full h-full object-cover rounded-lg '
          />
        </div>
        <h1 className='mt-2 text-2xl dark:text-cyan-500 text-slate-950 font-bold'>
          {item.name}
        </h1>
        <h1 className=' text-xl dark:text-cyan-500 text-slate-900 font-semibold'>
          Instructor: {item.instructorName}
        </h1>
        <h1 className='text-xl dark:text-cyan-600 text-slate-900 font-semibold'>
          Total Students: {item.enrolled}
        </h1>
        <h2 className='text-xl dark:text-cyan-600 text-slate-900 font-semibold'>
          Total Seat: {item.seat}
        </h2>
        <h1 className='text-xl dark:text-cyan-600 text-slate-900 font-semibold'>
          Available Seat: {item.seat - item.enrolled}
        </h1>
        <h2 className='text-xl dark:text-cyan-600 text-slate-900 font-semibold'>
          Price: ${item.price}
        </h2>
        <div className='mt-5'>
          {item.seat === item.enrolled ? (
            <span className='py-2 px-5 cursor-default dark:bg-cyan-500 bg-slate-800 dark:text-slate-800 text-slate-200 font-semibold rounded'>
              No Available Seat
            </span>
          ) : (
            <button disabled={user && user.role === 'STUDENT'}>
              {!isEnrolled ? (
                <Link
                  to={`/checkout/${item._id}`}
                  className='py-2 px-5 dark:bg-cyan-500 bg-slate-800 dark:text-slate-800 text-slate-200 font-semibold rounded'
                >
                  Enroll
                </Link>
              ) : (
                <span className='py-2 px-5 cursor-default dark:bg-cyan-500 bg-slate-800 dark:text-slate-800 text-slate-200 font-semibold rounded'>
                  Enrolled
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </Fade>
  );
};

export default ClassCard;
