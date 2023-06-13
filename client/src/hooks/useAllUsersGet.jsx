import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useGet = () => {
  const axiosSecure = useAxios();

  const { isLoading, refetch, data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin');
      return res.data;
    },
  });

  return { isLoading, data, refetch };
};

export default useGet;
