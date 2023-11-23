import axios from "axios";
import { useEffect } from "react";
import useCustomeHook from "../useCustomeHook";

const axiosSecure = axios.create({
  baseURL: "https://online-study-explore.vercel.app",
  withCredentials: true,
});

const useAxiosHook = () => {
  const { logOut } = useCustomeHook();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log("You are Fall in", error.response.status, "Route Status");
        if (error.response.status === 401 || error.response.status === 403) {
          logOut();
        }
      }
    );
  }, [logOut]);

  return axiosSecure;
};

export default useAxiosHook;
