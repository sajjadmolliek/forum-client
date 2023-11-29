import { useEffect, useState } from "react";
import useAuthProvider from "../useAuthProvider/useAuthProvider";
import useAxiousPublic from "../useAxiousPublic/useAxiousPublic";


const useAboutUser = () => {
    const { user } = useAuthProvider();
    const axiosPublic = useAxiousPublic();
    const [aboutData,setAboutData] = useState([])
  
      const email = user?.email;
      
     useEffect(() => {
        axiosPublic.get(`/aboutUser?email=${email}`).then((res) => {
          setAboutData(res.data);
          
        });
      }, [axiosPublic, email]);
    return aboutData;
};

export default useAboutUser;