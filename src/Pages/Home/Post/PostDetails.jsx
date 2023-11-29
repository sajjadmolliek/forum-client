import { RiVerifiedBadgeFill } from "react-icons/ri";
import {useNavigate, useParams } from "react-router-dom";
import TimeAgo from "../../../Components/Sorting/SortByTime/SortByTime";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import { IconButton, TextField, Tooltip } from "@mui/material";
import Share from "./Share";
import useAxiousPublic from "../../../Hooks/useAxiousPublic/useAxiousPublic";
import useAuthProvider from "../../../Hooks/useAuthProvider/useAuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AwesomeButton } from "react-awesome-button";
import { useQuery } from "@tanstack/react-query";


const PostDetails = () => {
  // const idData = useLoaderData();
  const _id = useParams();
  const id = _id.id
  const axiosPublic = useAxiousPublic();
  const { user } = useAuthProvider();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const { data, refetch:dataRefetch } = useQuery({
    queryKey: ["detailsGet"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/details/${id}`);
      return res.data;
    },
  });

  const { data: comment, refetch } = useQuery({
    queryKey: ["commentGet"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/comments/${id}`);
      return res.data;
    },
  });


  const onSubmit = async (data) => {
    if (user !== null) {
    
      const objData = {
        commentId: id,
        commenter: user?.email,
        comment: data?.comment,
      };
      console.log(objData);
      const res = await axiosPublic.post("/comment", objData);
      if (res.data.insertedId) {
        Swal.fire("Successfully", "Post your content", "success");
        reset();
        refetch();
      }
    } else {
      navigate("/login");
    }
  };

  const handleLike = () => {

    axiosPublic.patch(`/details/${id}?email=${user?.email}`,{upVote:data?.upVote}).then((res) => {
      console.log(res)
      if (res.data.modifiedCount > 0) {
        dataRefetch();
        Swal.fire({
          title: "Update!",
          text: `( ${user.displayName} ) is Gold Member Now`,
          icon: "success",
        });
      }
    });


  };
  const handleDisLike = () => {

    axiosPublic.patch(`/disLike/${id}`,{downVote:data?.downVote,email:user?.email}).then((res) => {
      console.log(res)
      if (res.data.modifiedCount > 0) {
        dataRefetch();
        Swal.fire({
          title: "Update!",
          text: `( ${user.displayName} ) is Gold Member Now`,
          icon: "success",
        });
      }
    });


    console.log("DisLike");
  };


const likeFind = data?.likesId?.find(res=> user.email === res)
const disLikeFind = data?.disLikesId?.find(res=> user.email === res)
if(likeFind){
  // setStateLike(true);
console.log("Ami Paichi Mamu Tomare")
}
  return (
    <div className="mt-20">
      <div className="mx-5 flex space-y-5 md:space-y-0  md:flex-row flex-col items-center justify-between bg-[#187BD1] text-white border-[1px] p-10 rounded-xl border-[#187BD1] hover:shadow-lg hover:bg-gradient-to-r from-[#00ffffad] to-[#187BD1] transition delay-500 duration-1000">
        <div className="flex gap-5 items-center">
          <img
            src={data?.image}
            alt="Author"
            className="w-[3rem] rounded-full border-[1px]  border-[#187BD1]"
          />
          <div className="">
            <div className="flex items-center">
              {data?.postTittle} <RiVerifiedBadgeFill className="ml-3 mr-1" />
              Post an update
            </div>
            <TimeAgo gettime={data?.postedTime}></TimeAgo>
          </div>
        </div>
        <div>
          <p>#{data?.tag}</p>
        </div>
        <div>
          <p>Name: {data?.Auther}</p>
        </div>
        <div>
          <p>Description: {data?.description}</p>
        </div>
        <Tooltip title="Share">
          <IconButton>
            <Share id={data?._id}></Share>
          </IconButton>
        </Tooltip>
        <div className="flex flex-col md:space-y-3 md:items-center gap-5 md:gap-0">
          <div className="flex items-center gap-10 md:gap-20">
            <div>
              {likeFind ? (
                <ThumbUpAltRoundedIcon className="text-[#09ff00]" />
              ) : (
                <ThumbUpAltRoundedIcon onClick={handleLike} />
              )}
              {data?.upVote}
            </div>
            <div>
              {disLikeFind ? (
                <ThumbDownAltRoundedIcon className="text-[#09ff00]" />
              ) : (
                <ThumbDownAltRoundedIcon onClick={handleDisLike} />
              )}
              {data?.downVote}
            </div>
          </div>
          <div>
            {comment?.length} comments{" "}
            <ModeCommentRoundedIcon style={{ marginLeft: 20 }} />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex ">
          <TextField
            id="standard-basic"
            label="Comment"
            variant="standard"
            {...register("comment", { required: true })}
          />
          <div>
            <AwesomeButton className=" w-9/12 mx-auto" type="primary">
              Post
            </AwesomeButton>
          </div>
        </form>
      </div>
    </div>
  );

};

export default PostDetails;
