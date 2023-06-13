import useGet from '../../hooks/useGet';
import { Loader } from '../../components/Loader';
import ClassCard from '../../components/ClassCard';

const PopularClasses = () => {
  const { isLoading, data } = useGet('/classes/popular', 'popularClass');

  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 mt-5'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data.classes.map((item) => (
            <ClassCard key={item._id} item={item} />
          ))}
        </>
      )}
    </div>
  );
};

export default PopularClasses;
