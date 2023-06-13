import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useGet = (endpoint, key) => {
  const axiosSecure = useAxios();

  const { isLoading, refetch, data } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axiosSecure.get(endpoint);
      return res.data;
    },
  });

  return { isLoading, data, refetch };
};

export default useGet;
