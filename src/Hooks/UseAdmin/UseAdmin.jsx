import { useQuery } from "@tanstack/react-query";
import useAuthProvider from "../useAuthProvider/useAuthProvider";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const UseAdmin = () => {
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure();
  const { data:isAdmin = false, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],

    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data?.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default UseAdmin;
