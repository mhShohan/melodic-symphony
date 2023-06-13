import { useParams } from 'react-router-dom';
import useGet from '../hooks/useGet';
import { Loader } from '../components/Loader';
import ClassCard from '../components/ClassCard';

const InstructorDetail = () => {
  const { id } = useParams();
  const { isLoading, data } = useGet(`user/instructors/${id}`, 'instructor');

  return (
    <div className='py-10 dark:bg-slate-700 bg-slate-300'>
      <div className='container'>
        <div>{isLoading && <Loader />}</div>
        <div className='border p-5 rounded-md md:flex gap-10 dark:border-cyan-400 border-slate-800 dark:text-cyan-400 text-slate-800'>
          <div className='md:w-1/3'>
            <img
              src={data?.instructor.photoURL}
              alt={data?.instructor.displayName}
              className='w-full rounded-md'
            />
          </div>
          <div className='w-2/3 text-2xl flex flex-col justify-center mt-5'>
            <h1>Name: {data?.instructor.displayName}</h1>
            <h1>Email: {data?.instructor.email}</h1>
            <h1>Total Classes: {data?.instructor.takenClasses.length}</h1>
            <h1>
              Total Students:{' '}
              {data?.instructor.takenClasses.reduce((acc, cur) => {
                acc += cur.enrolled;
                return acc;
              }, 0)}
            </h1>
            {/* 
            <h1>{instructor}</h1> */}
          </div>
        </div>
        <div className='mt-10'>
          <h1 className='text-5xl mb-5 text-center border-b pb-2 dark:border-cyan-400 border-slate-800 dark:text-cyan-400 text-slate-800'>
            Class is being Taken by {data?.instructor.displayName}
          </h1>
          {data?.instructor.takenClasses.length <= 0 && (
            <h1 className='text-center text-3xl text-red-600 my-10'>
              No Classes Available!
            </h1>
          )}
          <div className='grid gap-5 grid-cols-1 md:grid-cols-3 mt-10'>
            {data?.instructor.takenClasses.length > 0 &&
              data?.instructor.takenClasses.map((item) => (
                <ClassCard key={item._id} item={item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetail;
