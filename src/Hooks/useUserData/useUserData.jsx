import React from "react";
import useAxiousPublic from "../useAxiousPublic/useAxiousPublic";
import useAuthProvider from "../useAuthProvider/useAuthProvider";

const useUserData = () => {
  const axiosPublic = useAxiousPublic();
  const [membership, setMembership] = React.useState(null);
  const [admin, setAdmin] = React.useState(false);
  const [allData, setAllData] = React.useState(false);
  const { user } = useAuthProvider();

  React.useEffect(() => {
    const email = user?.email;
    if (email) {
      axiosPublic.get(`/users/admin?email=${email}`).then((res) => {
        setAllData(res.data);
        if (res?.data?.role === "Admin") {
          setAdmin(true);
        }
        setMembership(res?.data?.membership);
      });
    }
  }, [axiosPublic, user]);

  return [membership, admin, setAdmin, allData];
};

export default useUserData;
