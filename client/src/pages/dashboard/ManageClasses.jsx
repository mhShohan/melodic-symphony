import { Loader } from '../../components/Loader';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdRateReview } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';

const ManageClasses = () => {
  const axiosSecure = useAxios();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [limit, setLimit] = useState(7);
  const [currPage, setCurrPage] = useState(0);
  const [total, setTotal] = useState(null);
  const [update, setUpdate] = useState(true);

  const totalPages = Math.ceil(total / limit);

  const handleStatusChange = async (item) => {
    const { value } = await Swal.fire({
      title: 'Change Status of ' + item.name,
      input: 'select',
      inputOptions: {
        PENDING: 'PENDING',
        APPROVED: 'APPROVED',
        DENY: 'DENY',
      },
      inputPlaceholder: 'Select status',
      showCancelButton: true,
      inputValidator: (value) => {
        return axiosSecure
          .patch(`/admin/classes/${item._id}`, { status: value })
          .then((res) => {
            setUpdate((p) => !p);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
    if (value) {
      Swal.fire(`${item.name} is ${value} now!`);
    }
  };

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete ${item.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/admin/classes/${item._id}`);
        if (!res.data.error) {
          setUpdate((p) => !p);
          Swal.fire('Deleted!', 'Deleted Successfully!.', 'success');
        }
      } catch (error) {
        Swal.fire('Error!', 'Something is error to Delete!.', 'error');
      }
    }
  };

  const handleReview = async (item) => {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Give a review of ' + item.name,
      inputPlaceholder: 'Type your review here...',
      inputAttributes: {
        'aria-label': 'Type your review here',
      },
      showCancelButton: true,
    });

    if (text) {
      await axiosSecure.patch(`/classes/review/${item._id}`, { review: text });
      Swal.fire(text);
      setUpdate((p) => !p);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await axiosSecure.get(
        `/admin/classes?limit=${limit}&page=${currPage}`
      );

      setData(res.data);
      setTotal(res.data.total);

      setIsLoading(false);
    })();
  }, [currPage, update]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className=''>
          {!isLoading && (
            <>
              <Table
                data={data}
                handleDelete={handleDelete}
                handleStatusChange={handleStatusChange}
                handleReview={handleReview}
              />
              <div className='my-5 center'>
                <Pagination
                  totalPages={totalPages}
                  currPage={currPage}
                  setCurrPage={setCurrPage}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageClasses;

const Table = ({ data, handleDelete, handleStatusChange, handleReview }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200 text-center'>
        <thead className='bg-gray-50'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Image
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Class Name
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Instructor Name
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Price
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Total Seat
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Student
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Status
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {data?.classes?.map((item) => (
            <TableRow
              key={item._id}
              item={item}
              handleDelete={handleDelete}
              handleStatusChange={handleStatusChange}
              handleReview={handleReview}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableRow = ({ item, handleDelete, handleStatusChange, handleReview }) => {
  return (
    <tr>
      <td lassName='px-6 py-4'>
        <div className='w-12 h-12 rounded-full mx-auto'>
          <img
            src={item.photo}
            alt={item.name}
            className=' w-12 h-12 rounded-full object-cover'
          />
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className=''>
            <div className='text-sm font-medium text-gray-900'>{item.name}</div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{item.instructorName}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>${item.price}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900 text-center'>{item.seat}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900 text-center'>{item.enrolled}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-slate-900 ${
            item.status === 'PENDING' && 'bg-amber-500'
          } ${item.status === 'DENY' && 'bg-red-400'} ${
            item.status === 'APPROVED' && 'bg-green-300'
          }`}
        >
          {item.status}
        </span>
      </td>
      <td className='text-center'>
        {!item.review && item.status === 'DENY' && (
          <div className='tooltip tooltip-left' data-tip='Feedback'>
            <button
              className='text-2xl mr-3'
              onClick={() => handleReview(item)}
            >
              <MdRateReview />
            </button>
          </div>
        )}
        <div className='tooltip tooltip-left' data-tip='Change  Status'>
          <button className='text-2xl' onClick={() => handleStatusChange(item)}>
            <FaEdit />
          </button>
        </div>
        <div className='tooltip tooltip-left' data-tip='Delete Class'>
          <button className='text-2xl ml-2' onClick={() => handleDelete(item)}>
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};
