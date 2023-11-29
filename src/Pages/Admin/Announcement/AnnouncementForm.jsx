import { AwesomeButton } from "react-awesome-button";
import { useForm } from "react-hook-form";
import useAxiousPublic from "../../../Hooks/useAxiousPublic/useAxiousPublic";
import useAuthProvider from "../../../Hooks/useAuthProvider/useAuthProvider";
import { useState } from "react";
import Swal from "sweetalert2";

const AnnouncementForm = () => {
  const axiosPublic = useAxiousPublic();
  const { user } = useAuthProvider();
  const [btn, setBtn] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    setBtn(false);
    const objData = {
      name: user?.displayName,
      email: user?.email,
      tittle: data?.tittle,
      description: data?.description,
    };
    reset();
    axiosPublic.post("/announcement", objData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire("Successfully", "Added Your About", "success");
        setBtn(true);
      }
    });
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-9/12 mx-auto space-y-8">
        {/* Tittle */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Announcement Tittle</span>
          </label>
          <input
            type="text"
            placeholder="Your Name"
            defaultValue={name}
            className="input input-bordered w-full"
            {...register("tittle", { required: true })}
          />
          {errors.tittle && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Announcement Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Post Description"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
      </div>

      <div className="flex justify-center my-10">
        {btn ? (
          <AwesomeButton className=" w-9/12 mx-auto" type="primary">
            Published
          </AwesomeButton>
        ) : (
          <div className=" text-center bg-[#8fb7d9] text-white w-9/12 py-3">
            Published
          </div>
        )}
      </div>
    </form>
  );
};

export default AnnouncementForm;
