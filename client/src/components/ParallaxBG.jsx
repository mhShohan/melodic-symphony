const ParallaxBG = ({ img, title, body }) => {
  return (
    <div
      className='h-96 parallax center'
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0.7) 100%), url(${img})`,
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='md:w-2/3 rounded-xl p-20 bg-slate-900 opacity-90 text-center flex flex-col items-center gap-5'>
        <h1 className='text-6xl text-yellow-400 font-bold'>{title}</h1>
        <h2 className='text-gray-200 glory'>{body}</h2>
      </div>
    </div>
  );
};

export default ParallaxBG;
