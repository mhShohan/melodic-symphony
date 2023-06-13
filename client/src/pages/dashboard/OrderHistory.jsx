import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import Pagination from '../../components/Pagination';
import useAxios from '../../hooks/useAxios';
import formatDate from '../../utils/formatDate';

const OrderHistory = () => {
  const axiosSecure = useAxios();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [limit, setLimit] = useState(7);
  const [currPage, setCurrPage] = useState(0);
  const [total, setTotal] = useState(null);

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await axiosSecure.get(
        `/orders?limit=${limit}&page=${currPage}`
      );

      setData(res.data);
      setTotal(res.data.total);

      setIsLoading(false);
    })();
  }, [currPage]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <Table data={data} />
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

export default OrderHistory;

const Table = ({ data }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Class Name
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Instructor Name
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              TransactionID
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Price
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Order Time || Date
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {data?.orders?.map((order) => (
            <TableRow key={order._id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableRow = ({ order }) => {
  return (
    <tr>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className=''>
            <div className='text-sm font-medium text-gray-900'>
              {order.className}
            </div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{order.instructor}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{order.transactionID}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>${order.price}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>
          {formatDate(order.createdAt)}
        </div>
      </td>
    </tr>
  );
};
