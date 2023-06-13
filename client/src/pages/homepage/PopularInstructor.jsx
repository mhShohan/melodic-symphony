import { Loader } from '../../components/Loader';
import useGet from '../../hooks/useGet';
import InstructorCard from '../../components/InstructorCard';

const PopularInstructor = () => {
  const { isLoading, data } = useGet(
    '/user/instructors/popular',
    'popularInstructors'
  );

  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 mt-5'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data.instructors.map((item) => (
            <InstructorCard key={item._id} item={item} />
          ))}
        </>
      )}
    </div>
  );
};

export default PopularInstructor;
