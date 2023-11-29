import { AwesomeButton } from "react-awesome-button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiousPublic from "../../../Hooks/useAxiousPublic/useAxiousPublic";
import Swal from "sweetalert2";
import useAuthProvider from "../../../Hooks/useAuthProvider/useAuthProvider";
import useAboutUser from "../../../Hooks/useAboutUser/useAboutUser";

const EditAbout = () => {
  const navigation = useNavigate();
  const axiosPublic = useAxiousPublic();
  const { user } = useAuthProvider();
  console.log(user?.email);
  const aboutData = useAboutUser()

  const {name,aboutEmail,phone,address} = aboutData;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const objData = {
      name: data?.name,
      email: user?.email,
      aboutEmail: data?.aboutEmail,
      phone:data?.phone,
      address:data?.address,
    };
    axiosPublic.patch("/aboutUser", objData).then((res) => {
      if (res.data.acknowledged) {
        Swal.fire("Successfully", "Added Your About", "success");
        navigation("/userProfile");
      }
    });
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-9/12 mx-auto space-y-8">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">What is your name?</span>
          </label>
          <input
            type="text"
            placeholder="Your Name"
            defaultValue={name}
            className="input input-bordered w-full"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">What is your Email?</span>
          </label>
          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered w-full"
              defaultValue={aboutEmail}
            {...register("aboutEmail", { required: true })}
          />
          {errors.email && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">What is your Number?</span>
          </label>
          <input
            type="phone"
            placeholder="Your Phone Number"
            className="input input-bordered w-full"
              defaultValue={phone}
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">What is your Address?</span>
          </label>
          <input
            type="text"
            placeholder="Your Address"
            className="input input-bordered w-full"
              defaultValue={address}
            {...register("address", { required: true })}
          />
          {errors.address && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <AwesomeButton className=" w-9/12 mx-auto" type="primary">
          Submit
        </AwesomeButton>
      </div>
    </form>
  );
};

export default EditAbout;
