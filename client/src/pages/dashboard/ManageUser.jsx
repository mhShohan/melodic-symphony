import { FaEdit, FaTrash } from 'react-icons/fa';
import { Loader } from '../../components/Loader';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';

const ManageUser = () => {
  const axiosSecure = useAxios();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [limit, setLimit] = useState(7);
  const [currPage, setCurrPage] = useState(0);
  const [total, setTotal] = useState(null);
  const [update, setUpdate] = useState(true);

  const totalPages = Math.ceil(total / limit);

  const handleRoleChange = async (user) => {
    const { value } = await Swal.fire({
      title: 'Change Role',
      input: 'select',
      inputOptions: {
        INSTRUCTOR: 'INSTRUCTOR',
        ADMIN: 'ADMIN',
      },
      inputPlaceholder: 'Select Role',
      showCancelButton: true,
      inputValidator: (value) => {
        return axiosSecure
          .patch(`/admin/${user._id}`, { role: value })
          .then((res) => {
            setUpdate((p) => !p);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });

    if (value) {
      Swal.fire(`${user.displayName} is ${value} now!`);
    }
  };

  const handleDelete = async (user) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete ${user.displayName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/admin/${user._id}`);
        if (!res.data.error) {
          setUpdate((p) => !p);
          Swal.fire('Deleted!', 'Deleted Successfully!.', 'success');
        }
      } catch (error) {
        Swal.fire('Error!', 'Something is error to Delete!.', 'error');
      }
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await axiosSecure.get(
        `/admin?limit=${limit}&page=${currPage}`
      );

      setData(res.data);
      setTotal(res.data.total);

      setIsLoading(false);
    })();
  }, [currPage, update]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <Table
        data={data}
        handleRoleChange={handleRoleChange}
        handleDelete={handleDelete}
      />
      <div className='my-5 center'>
        <Pagination
          totalPages={totalPages}
          currPage={currPage}
          setCurrPage={setCurrPage}
        />
      </div>
    </div>
  );
};

export default ManageUser;

const Table = ({ data, handleRoleChange, handleDelete }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Image
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Name
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Email
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Phone
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Role
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {data?.users?.map((user) => (
            <TableRow
              key={user._id}
              user={user}
              handleRoleChange={handleRoleChange}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableRow = ({ user, handleRoleChange, handleDelete }) => {
  return (
    <tr>
      <td lassName='px-6 py-4'>
        <div className='w-12 h-12 rounded-full mx-auto'>
          <img
            src={user.photoURL}
            alt={user.displayName}
            className=' w-12 h-12 rounded-full object-cover'
          />
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className=''>
            <div className='text-sm font-medium text-gray-900'>
              {user.displayName}
            </div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{user.email}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{user.phone}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-slate-900 ${
            user.role === 'ADMIN' && 'bg-blue-300'
          } ${user.role === 'INSTRUCTOR' && 'bg-yellow-300'} ${
            user.role === 'STUDENT' && 'bg-green-300'
          }`}
        >
          {user.role}
        </span>
      </td>
      <td>
        <div className='tooltip tooltip-left' data-tip='Change Role'>
          <button
            className='text-2xl ml-5'
            onClick={() => handleRoleChange(user)}
          >
            <FaEdit />
          </button>
        </div>
        <div className='tooltip tooltip-left' data-tip='Delete'>
          <button className='text-2xl ml-5' onClick={() => handleDelete(user)}>
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};
