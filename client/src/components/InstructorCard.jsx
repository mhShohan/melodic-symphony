import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';

const InstructorCard = ({ item }) => {
  return (
    <Fade duration={3000}>
      <div className='p-5 scale_up border-2 text-center dark:border-cyan-700 border-slate-700 rounded-lg'>
        <div className='h-60 w-full'>
          <img
            src={item.photoURL}
            alt={item.displayName}
            className='w-full h-full object-cover rounded-lg '
          />
        </div>
        <h1 className='mt-2 text-2xl dark:text-cyan-500 uppercase text-slate-950 font-bold'>
          {item.displayName}
        </h1>
        <h1 className='mt-1 text-sm dark:text-cyan-600 text-slate-900 font-semibold'>
          Email: {item.email}
        </h1>
        <h1 className='mt-1 text-xl dark:text-cyan-600 text-slate-900 font-semibold'>
          Total Classes: {item.totalClasses}
        </h1>
        <h1 className='mt-1 text-xl dark:text-cyan-600 text-slate-900 font-semibold'>
          Total Students: {item.totalStudents}
        </h1>
        <Link to={`/instructors/${item._id}`}>
          <button className='my-5 py-2 px-5 dark:bg-cyan-500 bg-slate-800 dark:text-slate-800 text-slate-200 font-semibold rounded'>
            See Classes
          </button>
        </Link>
      </div>
    </Fade>
  );
};

export default InstructorCard;
