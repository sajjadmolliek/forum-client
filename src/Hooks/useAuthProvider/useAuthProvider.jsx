import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const useAuthProvider = () => {
    const all = useContext(AuthContext)
    return ( all );
};

export default useAuthProvider;