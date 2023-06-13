import React, { useState, useEffect } from 'react';
import SideNav from './Sidenav';
import { Outlet } from 'react-router-dom';
import HeadTitle from '../../components/HeadTitle';

const DashboardLayout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsNavOpen(true);
      } else {
        setIsNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <HeadTitle>Dashboard</HeadTitle>
      <div className='flex h-screen bg-slate-300'>
        {/* Sidebar */}
        <aside
          className={`bg-slate-800 text-white flex-none w-64 py-4 px-6 ${
            isNavOpen || window.innerWidth >= 768 ? 'block' : 'hidden'
          }`}
        >
          {/* Sidebar content goes here */}
          <h1 className='text-3xl text-cyan-400'>My Dashboard</h1>
          <SideNav />
        </aside>

        {/* Main Content */}
        <div className='flex flex-col flex-1 overflow-hidden'>
          {/* Navbar */}
          <header className='bg-slate-800 shadow h-16 flex items-center px-6'>
            <div className='flex items-center justify-center'>
              <button
                className='text-gray-100 focus:outline-none lg:hidden'
                onClick={toggleNav}
              >
                <svg
                  className='h-10 w-10'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
              {/* Navbar content goes here */}
            </div>
          </header>

          {/* Page content goes here */}
          <div className='m-5 text-slate-800'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
