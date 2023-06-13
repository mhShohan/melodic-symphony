import HeadTitle from '../../components/HeadTitle';
import ParallaxBg from '../../components/ParallaxBG';
import img from '../../assets/banner/img1.jpg';
import ClassCard from '../../components/ClassCard';
import { Loader } from '../../components/Loader';
import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import Pagination from '../../components/Pagination';
import Button from '../../components/Button';

const Classes = () => {
  const axiosSecure = useAxios();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [limit, setLimit] = useState(9);
  const [currPage, setCurrPage] = useState(0);
  const [total, setTotal] = useState(null);
  const [searchText, setSearchText] = useState('');

  const totalPages = Math.ceil(total / limit);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(e.target.search.value);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await axiosSecure.get(
        `/classes/all?limit=${limit}&page=${currPage}&search=${searchText}`
      );

      setData(res.data);
      setTotal(res.data.total);

      setIsLoading(false);
    })();
  }, [currPage, searchText]);

  return (
    <>
      <HeadTitle>Classes</HeadTitle>
      <ParallaxBg img={img} title='All Classes' />
      <section className='py-10 dark:bg-slate-800 bg-slate-100'>
        <div className='container'>
          <div className='center'>{isLoading && <Loader />}</div>
          <div className='mb-10 center'>
            <form onSubmit={handleSearch}>
              <div className='form-control'>
                <div className='input-group'>
                  <input
                    type='text'
                    placeholder='Search by class name…'
                    name='search'
                    className='input input-bordered'
                  />
                  <button className='btn btn-square' type='submit'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {!isLoading &&
              data.classes.map((item) => (
                <ClassCard key={item._id} item={item} />
              ))}
          </div>
          <div className='my-5 center'>
            <Pagination
              totalPages={totalPages}
              currPage={currPage}
              setCurrPage={setCurrPage}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Classes;
