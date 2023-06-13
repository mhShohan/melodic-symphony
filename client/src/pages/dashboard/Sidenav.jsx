import { Link, NavLink } from 'react-router-dom';
import useRole from '../../hooks/useRole';

const Sidenav = () => {
  const role = useRole();

  return (
    <div className='mt-5 flex flex-col relative'>
      <SidebarLink path='/dashboard/profile' title='My Profile' />
      {role === 'STUDENT' && (
        <SidebarLink path='/dashboard/EnrolledClasses' title='Classes' />
      )}
      {role === 'INSTRUCTOR' && (
        <SidebarLink path='/dashboard/MyClasses' title='My Classes' />
      )}
      {role === 'ADMIN' && (
        <SidebarLink path='/dashboard/ManageUser' title='Manage Users' />
      )}
      {role === 'ADMIN' && (
        <SidebarLink path='/dashboard/ManageClasses' title='Manage Classes' />
      )}
      {role === 'INSTRUCTOR' && (
        <SidebarLink path='/dashboard/CreateClass' title='Add Class' />
      )}
      {role === 'ADMIN' && (
        <SidebarLink
          path='/dashboard/CreateInstructor'
          title='Add Instructor'
        />
      )}
      {role === 'ADMIN' && (
        <SidebarLink path='/dashboard/OrderHistory' title='Order History' />
      )}

      <div className='mt-10 bg-cyan-600 py-1 px-5 text-center rounded'>
        <button>
          <Link to='/'>Back to Homepage</Link>
        </button>
      </div>
    </div>
  );
};

export default Sidenav;

const SidebarLink = ({ path, title }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        !isActive
          ? 'text-cyan-700 text-xl border-b-2 border-cyan-700 mb-3'
          : 'text-cyan-500 text-xl border-b-2 border-cyan-500 mb-3'
      }
    >
      {title}
    </NavLink>
  );
};
