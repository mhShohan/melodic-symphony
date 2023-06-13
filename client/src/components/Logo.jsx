import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link
      to='/'
      className='text-2xl font-bold dark:text-cyan-400 text-slate-900'
    >
      MelodicSymphony
    </Link>
  );
};

export default Logo;
