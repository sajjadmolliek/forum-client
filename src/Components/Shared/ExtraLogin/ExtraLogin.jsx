import { FcGoogle } from "react-icons/fc";
import useAuthProvider from "../../../Hooks/useAuthProvider/useAuthProvider";
import useAxiousPublic from "../../../Hooks/useAxiousPublic/useAxiousPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ExtraLogin = () => {
  const { googleLogin } = useAuthProvider();
  const axiosPublic = useAxiousPublic();
  const navigate = useNavigate();

  const googleResister = () => {
    googleLogin()
      .then((res) => {
        axiosPublic
          .post("/users", {
            name: res.user.displayName,
            email: res.user.email,
            image: res.user.photoURL,
          })
          .then((res) => {
            if (res.data.acknowledged) {
              Swal.fire("Successfully", "Log in", "success");
              navigate(location.state ? location.state : "/");
            }
          });
      })
      .catch();
  };

  return (
    <button
      onClick={googleResister}
      className="grid grid-cols-3 font-bold border-2 px-4 text-center py-3 rounded-lg mx-7 mb-6 hover:bg-blue-500  hover:text-white"
    >
      <FcGoogle className="w-10 text-3xl  "></FcGoogle>
      <span>Google</span>
    </button>
  );
};

export default ExtraLogin;
