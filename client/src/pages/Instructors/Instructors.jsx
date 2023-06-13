import HeadTitle from '../../components/HeadTitle';
import ParallaxBg from '../../components/ParallaxBG';
import img from '../../assets/banner/img1.jpg';
import useGet from '../../hooks/useGet';
import InstructorCard from '../../components/InstructorCard';
import { Loader } from '../../components/Loader';

const Instructors = () => {
  const { isLoading, data, refetch } = useGet(
    '/user/instructors',
    'instructors'
  );

  console.log(data);

  return (
    <>
      <HeadTitle>Instructors</HeadTitle>
      <ParallaxBg img={img} title='Our Instructors' />
      <section className='py-10  dark:bg-slate-800 bg-slate-100'>
        <div className='container'>
          <div className='center'>{isLoading && <Loader />}</div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {!isLoading &&
              data.instructors.map((item) => (
                <InstructorCard key={item._id} item={item} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Instructors;
