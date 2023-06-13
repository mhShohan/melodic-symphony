import { FaGithub, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Logo from './Logo';
import { Fade, Slide } from 'react-awesome-reveal';

const Footer = () => {
  return (
    <footer className='footer py-8 px-2 dark:bg-slate-950 bg-slate-300'>
      <div className='container mx-auto md:flex justify-between items-center'>
        <Slide direction='left'>
          <div className='dark:text-cyan-700 text-slate-800 font-semibold my-3 order-2 md:order-1'>
            <p className='border-b border-slate-600'>Contact Information</p>
            <p>Email:mehdihasanshohan25@gmail.com</p>
            <p>Phone: +8801721146655</p>
          </div>
        </Slide>
        <Fade duration={5000}>
          <div className='md:text-center order-1 md:order-2'>
            <div className='mb-1'>
              <Logo />
            </div>
            <div className='flex gap-5 md:justify-center '>
              <a
                className='text-3xl dark:text-cyan-600 text-slate-900 cursor-pointer'
                href='https://github.com/mhShohan'
                target='_blank'
              >
                <FaGithub />
              </a>
              <a
                className='text-3xl dark:text-cyan-600 text-slate-900 cursor-pointer'
                href='https://www.linkedin.com/in/mehdi-hasan-shohan/'
                target='_blank'
              >
                <FaLinkedin />
              </a>
              <a
                className='text-3xl dark:text-cyan-600 text-slate-900 cursor-pointer'
                href='https://www.facebook.com/mhshohan17'
                target='_blank'
              >
                <FaFacebook />
              </a>
              <a
                className='text-3xl dark:text-cyan-600 text-slate-900 cursor-pointer'
                href='https://twitter.com/mehdi_hasan17'
                target='_blank'
              >
                <FaTwitter />
              </a>
            </div>
            <p className='mt-4 dark:text-cyan-600 text-slate-900 font-semibold'>
              &copy;2023 MelodicSymphony. All rights reserved by{' '}
              <a
                href='https://www.linkedin.com/in/mehdi-hasan-shohan/'
                className='text-pink-700 font-bold'
              >
                mhShohaN
              </a>
            </p>
          </div>
        </Fade>
        <Slide direction='right'>
          <div className='dark:text-cyan-700 text-slate-800 font-semibold my-3 md:text-right order-3'>
            <p className='border-b border-slate-600'>Address</p>
            <p>BSMRSTU, Gopalganj, Dhaka</p>
            <p>ZIP Code: 8100</p>
            <p>Bangladesh</p>
          </div>
        </Slide>
      </div>
    </footer>
  );
};

export default Footer;
