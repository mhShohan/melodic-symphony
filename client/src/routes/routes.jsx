import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/Layouts/MainLayout';
import Homepage from '../pages/homepage/Homepage';
import Instructors from '../pages/Instructors/Instructors';
import Classes from '../pages/Classes/Classes';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import Profile from '../pages/dashboard/Profile';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import CreateInstructor from '../pages/dashboard/CreateInstructor';
import CreateClass from '../pages/dashboard/CreateClass';
import ManageUser from '../pages/dashboard/ManageUser';
import MyClasses from '../pages/dashboard/MyClasses';
import UpdateProfile from '../pages/dashboard/UpdateProfile';
import ManageClasses from '../pages/dashboard/ManageClasses';
import EnrolledClasses from '../pages/dashboard/EnrolledClasses';
import InstructorDetail from '../pages/InstructorDetail';
import UpdateClass from '../pages/dashboard/UpdateClass';
import PrivateRoute from './PrivateRoute';
import Checkout from '../pages/Checkout';
import OrderHistory from '../pages/dashboard/OrderHistory';
import StudentRoute from './StudentRoute';
import InstructorRoute from './InstructorRoute';
import AdminRoute from './AdminRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/instructors', element: <Instructors /> },
      { path: '/instructors/:id', element: <InstructorDetail /> },
      { path: '/classes', element: <Classes /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/profile', element: <Profile /> },
      {
        path: 'checkout/:id',
        element: (
          <PrivateRoute>
            <StudentRoute>
              <Checkout />
            </StudentRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { path: 'profile', element: <Profile /> },
      { path: 'CreateInstructor', element: <CreateInstructor /> },
      { path: 'CreateClass', element: <CreateClass /> },
      {
        path: 'ManageUser',
        element: (
          <AdminRoute>
            <ManageUser />{' '}
          </AdminRoute>
        ),
      },
      { path: 'ManageClasses', element: <ManageClasses /> },
      {
        path: 'EnrolledClasses',
        element: (
          <StudentRoute>
            <EnrolledClasses />
          </StudentRoute>
        ),
      },
      {
        path: 'MyClasses',
        element: (
          <InstructorRoute>
            <MyClasses />{' '}
          </InstructorRoute>
        ),
      },
      { path: 'OrderHistory', element: <OrderHistory /> },
      {
        path: 'update-profile',
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      { path: 'update-class/:id', element: <UpdateClass /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
