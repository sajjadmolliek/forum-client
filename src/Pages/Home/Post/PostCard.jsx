/* eslint-disable react/prop-types */
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import TimeAgo from "../../../Components/Sorting/SortByTime/SortByTime";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import useAxiousPublic from "../../../Hooks/useAxiousPublic/useAxiousPublic";
import { useEffect, useState } from "react";

const PostCard = ({ post }) => {
  const axiosPublic = useAxiousPublic();
  const { _id, image, tag, postTittle, upVote, downVote, postedTime } = post;
const [comments,setComments] = useState([])

    useEffect(() => {
         axiosPublic.get(`/comments/${_id}`)
         .then(res=> setComments(res.data))
     
  }, [axiosPublic,_id]);

  return (
    <Link to={`/post/${_id}`}>
      <div className="mx-5 flex space-y-5 md:space-y-0  md:flex-row flex-col items-center justify-between bg-[#187BD1] text-white border-[1px] p-10 rounded-xl border-[#187BD1] hover:shadow-lg hover:bg-gradient-to-r from-[#00ffffad] to-[#187BD1] transition delay-500 duration-1000">
        <div className="flex gap-5 items-center">
          <img
            src={image}
            alt="Author"
            className="w-[3rem] rounded-full border-[1px]  border-[#187BD1]"
          />
          <div className="">
            <div className="flex items-center">
              {postTittle} <RiVerifiedBadgeFill className="ml-3 mr-1" />
              Post an update
            </div>
            <TimeAgo gettime={postedTime}></TimeAgo>
          </div>
        </div>
        <div>
          <p>#{tag}</p>
        </div>
        <div className="flex flex-col md:space-y-3 md:items-center gap-5 md:gap-0">
          <div className="flex items-center gap-10 md:gap-20">
            <div>
              <ThumbUpAltRoundedIcon /> {upVote}
            </div>
            <div>
              <ThumbDownAltRoundedIcon /> {downVote}
            </div>
          </div>
          <div>
            {comments?.length} comments
            <ModeCommentRoundedIcon style={{ marginLeft: 20 }} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
