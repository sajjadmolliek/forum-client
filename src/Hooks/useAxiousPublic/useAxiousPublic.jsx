import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5007",
  withCredentials: true,
});
const useAxiousPublic = () => {
  return axiosPublic;
};

export default useAxiousPublic;
