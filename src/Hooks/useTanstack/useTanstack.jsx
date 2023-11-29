// useTanstack.js
import { useState } from 'react';
import useAxiousPublic from '../useAxiousPublic/useAxiousPublic';
import { useQuery } from '@tanstack/react-query';

const useTanstack = () => {
  const axiosPublic = useAxiousPublic();
  const [search, setSearch] = useState("");

  const { data, isPending } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/posts/allPost?search=all`);
      setSearch(res.data);
      return res.data;
    },
  });

  return { search, setSearch };
};

export default useTanstack;
