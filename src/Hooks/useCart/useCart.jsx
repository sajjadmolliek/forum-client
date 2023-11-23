import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useAuthProvider from "../useAuthProvider/useAuthProvider";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuthProvider()
  const { refetch, data: cartData = [] } = useQuery({
    queryKey: ["cart", user?.email],
    
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });
  return [cartData,refetch];
};


export default useCart;
