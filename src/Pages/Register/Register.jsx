import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import HelmateTittle from "../../Components/Shared/HelmateTittle/HelmateTittle";
import useAuthProvider from "../../Hooks/useAuthProvider/useAuthProvider";
import Swal from "sweetalert2";
import useAxiousPublic from "../../Hooks/useAxiousPublic/useAxiousPublic";
import ExtraLogin from "../../Components/Shared/ExtraLogin/ExtraLogin";

const Register = () => {
  const { userSignUp, updateUserProfile } = useAuthProvider();
  const axiosPublic = useAxiousPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data, e) => {
    userSignUp(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photo);

        axiosPublic
          .post("/users", { name: data.name, email: data.email })
          .then((res) => {
            if (res.data.acknowledged) {
              Swal.fire("Successfully", "You create the account", "success");
              e.target.reset();
              navigate("/");
            }
          });
      })
      .catch((error) => {
        const errorMessage = error?.message;
        Swal.fire("Opps!!!!",  errorMessage ,"error");
      });
  };

  return (
    <>
      <HelmateTittle helmetTittle={"Bistro Boss | Register"}></HelmateTittle>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">SignUp now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div
            onSubmit={handleSubmit(onSubmit)}
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  {...register("name")}
                  placeholder="User Name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  name="photo"
                  type="text"
                  {...register("phot")}
                  placeholder="User Photo Url"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  {...register("email")}
                  placeholder="email"
                  className="input input-bordered"
                />
                {/* {errors.email && <span className="text-red-600">This field is required</span>} */}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  {...register("password", { required: true })}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="You Should enter at last 6 character one special character one uppercase and lower letter "
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-600">This field is required</span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-600">This field is required</span>
                )}

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  value={"Sign Up"}
                  type="submit"
                  className="btn btn-primary"
                />
              </div>
            </form>
            <p className="text-center mb-10">
              <small>
                Have you an account ? go to{" "}
                <Link to={"/login"} className="font-bold text-sm text-blue-600">
                  Login
                </Link>
              </small>
            </p>
            <ExtraLogin></ExtraLogin>
          </div>
        </div>
      </div>
    </>
  );
};


export default Register;
