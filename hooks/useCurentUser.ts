import useSwr from 'swr';

import fetcher from '../lib/fetcher';

const UseCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSwr('/api/current', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default UseCurrentUser;
