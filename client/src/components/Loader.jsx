import loader from '../assets/loader.svg';

export const FullLoader = () => {
  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 z-40 center bg-slate-700 h-screen`}
    >
      <div className='w-80 h-80'>
        <img src={loader} alt='loader' className='w-full' />
      </div>
    </div>
  );
};

export const Loader = () => {
  return (
    <div className='center h-[500px] w-full'>
      <div className='w-80 h-80'>
        <img src={loader} alt='loader' className='w-full' />
      </div>
    </div>
  );
};
