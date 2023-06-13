import { Link, NavLink } from 'react-router-dom';
import useDark from '../hooks/useDark';
import { MdDarkMode } from 'react-icons/md';
import Logo from './Logo';
import { FaBars } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import demo from '../assets/demo.png';
import { Slide } from 'react-awesome-reveal';

const Navbar = () => {
  const { handleThemeSwitch, theme } = useDark();
  const { logOut, user, setUpdate } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logOut();
    setUpdate((p) => !p);
    localStorage.removeItem('token');
    Swal.fire({ icon: 'success', title: 'Logout Successfully!' });
    setShowMobileMenu(false);
  };

  return (
    <nav className='flex justify-between z-20 items-center px-5 md:px-10 h-20 fixed top-0 left-0 right-0 dark:bg-slate-950 bg-slate-300 border-b-2 border-slate-700'>
      <div>
        <Logo />
      </div>
      {showMobileMenu && (
        <MobileMenu
          user={user}
          handleLogout={handleLogout}
          setShowMobileMenu={setShowMobileMenu}
        />
      )}
      <div className='md:flex items-center gap-5 hidden '>
        <NavbarLink path='/' title='Home' />
        <NavbarLink path='/instructors' title='Instructors' />
        <NavbarLink path='/classes' title='Classes' />
        {!user ? (
          <>
            <NavbarLink path='/login' title='Login' />
            {/* <NavbarLink path='/register' title='Register' /> */}
          </>
        ) : (
          <>
            <NavbarLink path='/dashboard/profile' title='Dashboard' />
            <button
              className='dark:text-cyan-600 text-slate-700 text-xl font-bold'
              onClick={handleLogout}
            >
              Logout
            </button>
            <Link to='/dashboard/profile'>
              <div
                className='w-12 h-12 rounded-full border-2 dark:border-cyan-400 border-slate-700 tooltip tooltip-bottom'
                data-tip={`${user?.displayName}\'s Profile`}
              >
                {user.photoURL ? (
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className='w-full h-full object-cover rounded-full'
                  />
                ) : (
                  <img
                    src={demo}
                    alt={user?.displayName}
                    className='w-full h-full object-cover rounded-full bg-slate-500'
                  />
                )}
              </div>
            </Link>
          </>
        )}

        <div
          className='tooltip tooltip-bottom'
          data-tip={theme !== 'dark' ? 'Dark Mode' : 'Light Mode'}
        >
          <button
            onClick={handleThemeSwitch}
            className='dark:text-cyan-400 text-slate-800 text-2xl mt-1'
          >
            {theme !== 'dark' ? <MdDarkMode /> : <MdDarkMode />}
          </button>
        </div>
      </div>
      <div className='md:hidden flex items-center gap-3'>
        <button
          className='dark:text-cyan-400 text-slate-800 text-2xl'
          onClick={() => setShowMobileMenu(true)}
        >
          <FaBars />
        </button>
        <div
          className='tooltip tooltip-bottom'
          data-tip={theme !== 'dark' ? 'Dark Mode' : 'Light Mode'}
        >
          <button
            onClick={handleThemeSwitch}
            className='dark:text-cyan-400 text-slate-800 text-2xl mt-1'
          >
            {theme !== 'dark' ? <MdDarkMode /> : <MdDarkMode />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const NavbarLink = ({ path, title, setShowMobileMenu = () => {} }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        !isActive
          ? 'dark:text-cyan-600 text-slate-700 text-xl font-bold'
          : 'dark:text-cyan-400 text-slate-950 text-xl font-bold'
      }
      to={path}
      onClick={() => setShowMobileMenu(false)}
    >
      {title}
    </NavLink>
  );
};

const MobileMenu = ({ user, handleLogout, setShowMobileMenu }) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-950 opacity-95 z-50 center'>
      <div className='flex flex-col items-center gap-3'>
        <button
          onClick={() => setShowMobileMenu(false)}
          className='text-4xl text-red-600 font-bold absolute top-5 right-5'
        >
          <AiOutlineClose />
        </button>
        <Slide direction='down'>
          {user && (
            <Link
              to='/dashboard/profile'
              onClick={() => setShowMobileMenu(false)}
            >
              <div
                className='w-12 h-12 rounded-full border-2 dark:border-cyan-400 border-slate-700 tooltip tooltip-bottom'
                data-tip={`${user?.displayName}\'s Profile`}
              >
                {user.photoURL ? (
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className='w-full h-full object-cover rounded-full'
                  />
                ) : (
                  <img
                    src={demo}
                    alt={user?.displayName}
                    className='w-full h-full object-cover rounded-full bg-slate-500'
                  />
                )}
              </div>
            </Link>
          )}
        </Slide>
        <Slide direction='left'>
          <NavbarLink
            path='/'
            title='Home'
            setShowMobileMenu={setShowMobileMenu}
          />
        </Slide>
        <Slide direction='right'>
          {' '}
          <NavbarLink
            path='/instructors'
            title='Instructors'
            setShowMobileMenu={setShowMobileMenu}
          />
        </Slide>
        <Slide direction='left'>
          <NavbarLink
            path='/classes'
            title='Classes'
            setShowMobileMenu={setShowMobileMenu}
          />
        </Slide>
        <Slide direction='right'></Slide>

        {!user ? (
          <>
            <Slide direction='left'>
              <NavbarLink
                path='/login'
                title='Login'
                setShowMobileMenu={setShowMobileMenu}
              />
            </Slide>
            <Slide direction='right'>
              <NavbarLink
                path='/register'
                title='Register'
                setShowMobileMenu={setShowMobileMenu}
              />
            </Slide>
          </>
        ) : (
          <>
            <Slide direction='right'>
              <NavbarLink path='/dashboard/profile' title='Dashboard' />
            </Slide>
            <Slide direction='up'>
              <button
                className='dark:text-cyan-600 text-slate-700 text-xl font-bold'
                onClick={handleLogout}
              >
                Logout
              </button>
            </Slide>
          </>
        )}
      </div>
    </div>
  );
};
