import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthProvider from "../useAuthProvider/useAuthProvider";


 const axiosSecure = axios.create({
    baseURL: 'http://localhost:5007',withCredentials: true,
    
  });
  
const useAxiosSecure = () => {
  const {logOut} = useAuthProvider()
  const navigate = useNavigate()
  axiosSecure.interceptors.response.use( (config) =>{
    return config
  },  (error)=>{
    
    if(error.response.status === 401 || error.response.status === 403)
    {
      logOut();
      navigate("/login")
    }

  })
    return axiosSecure;
};


export default useAxiosSecure;