import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://forum-server-five.vercel.app",
  withCredentials: true,
});
const useAxiousPublic = () => {
  return axiosPublic;
};

export default useAxiousPublic;
