import { useContext } from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { FullLoader } from '../Loader';

const MainLayout = () => {
  const { loading } = useContext(AuthContext);

  if (loading) return <FullLoader />;

  return (
    <>
      <Navbar />
      {/* {loading ? (
        <FullLoader />
      ) : (
        <> */}
      <div className='mt-20'></div>
      <Outlet />
      {/* </>
      )} */}
      <Footer />
      <ScrollRestoration />
    </>
  );
};

export default MainLayout;
