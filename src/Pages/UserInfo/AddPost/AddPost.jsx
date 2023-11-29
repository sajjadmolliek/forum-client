import { AwesomeButton } from "react-awesome-button";
import { useForm } from "react-hook-form";
import UserProFIle from "../../../Components/Shared/UserProFIle/UserProFIle";
import { Divider, Skeleton } from "@mui/material";
import useAuthProvider from "../../../Hooks/useAuthProvider/useAuthProvider";
import { useState } from "react";
import Select from "react-select";
import useAxiousPublic from "../../../Hooks/useAxiousPublic/useAxiousPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import que from "../../../assets/areYouWant.gif";



const AddPost = () => {
  const axiosPublic = useAxiousPublic();
  const { user } = useAuthProvider();
  const [selectedOption, setSelectedOption] = useState("");
  const [dis, setDis] = useState(true);
  const [isLimitHas, setIsLimitHas] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  // Select Option Tags Data
  const { data: tags = [] } = useQuery({
    queryKey: ["getForSelectAllTags"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tags`);
      
      return res?.data;
    },
  });
  const options = tags.map(collection => ({
    value: collection.Tags,
    label: collection.Tags,
  }));


  // Fetch data Is limit of post has or Exist
  const { data: isLimited=true , refetch } = useQuery({
    queryKey: [`${user?.email}`],
    queryFn: async () => {
      const res = await axiosPublic.get(`/posts/limit?email=${user?.email}`);
      setIsLimitHas(res.data.premiumUser);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    refetch();
    setDis(false)
    const objData = {
      Auther: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      postTittle: data?.postTittle,
      tag: selectedOption.value,
      description: data?.description,
      upVote: 0,
      downVote: 0,
      likesId: [],
      disLikesId: [],
    };
    const res = await axiosPublic.post("/posts", objData);
    if (res.data.insertedId) {
      Swal.fire("Successfully", "Post your content", "success");
      setDis(true)
      // ReFetch data Is limit of post has or Exist
      reset();
    }
  };
  const handleAlert = () =>{
      Swal.fire({
        title: "Do you want to be a Member?",
        text: "If you, then Click Yes",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/Membership")
          Swal.fire(
            "Thanks!",
            "Redirect to Membership Page to Pay ",
            "success"
          );
        } else if (result.isDenied) {
          Swal.fire(
            "Read Properly",
            "You can't post more than 5 without membership",
            "info"
          );
        }
      });
  }


  if (isLimitHas) {
    return (
      <div>
        <UserProFIle />
        <div className="max-w-[36rem] px-4 mx-auto text-justify mb-10 space-y-3 ">
          <h1>
            Name:{" "}
            <span className={user?.displayName ? "ml-5 " : "ml-5 opacity-30"}>
              {user?.displayName ? (
                user?.displayName
              ) : (
                <div>
                  <p>Fill Up</p>
                  <Skeleton />
                </div>
              )}
            </span>
          </h1>
          <Divider></Divider>
          <h1 className="">
            Email:{" "}
            <span className={user?.email ? "ml-5 " : "ml-5 opacity-30"}>
              {user?.email ? (
                user?.email
              ) : (
                <div>
                  <p>Fill Up your Email</p>
                  <Skeleton />
                </div>
              )}
            </span>
          </h1>
        </div>
        <Divider></Divider>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-20 min-h-screen">
          <div className="w-9/12 mx-auto space-y-8">
            {/* Post Tittle part */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Post Tittle</span>
              </label>
              <input
                type="text"
                placeholder="Your Post Tittle"
                className="input input-bordered w-full"
                //   defaultValue={phone}
                {...register("postTittle", { required: true })}
              />
              {errors.postTittle && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            {/* Select Tag part */}
            <div className="form-control h-32 w-full">
              <label className="label">
                <span className="label-text">Select Your Tags</span>
              </label>
              <Select
              defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                required
              />
            </div>
            {/* Description part */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Post Description</span>
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

          <div className="flex justify-center mt-32">
            <AwesomeButton disabled={!dis} className=" w-9/12 mx-auto" type="primary">
              Post
            </AwesomeButton>
          </div>
        </form>
       
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center my-auto flex-col space-y-20">
        <img className="lg:w-[25%]" src={que} alt="Are you want?" />
        <AwesomeButton onPress={handleAlert} type="primary">Become a Member</AwesomeButton>
      </div>
    );

  }
};

export default AddPost;

{
  /* <input className="input input-bordered w-full" 
   /> */
}
