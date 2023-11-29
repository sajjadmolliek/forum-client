/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
import TimeAgo from "../../../Components/Sorting/SortByTime/SortByTime";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import useAxiousPublic from '../../../Hooks/useAxiousPublic/useAxiousPublic';

const TimeLineCard = ({post}) => {
    const axiosPublic = useAxiousPublic();
    const { _id, image, tag, postTittle, upVote, downVote, postedTime } = post;
  const [comments,setComments] = useState()
  
      useEffect(() => {
           axiosPublic.get(`/comments/${_id}`)
           .then(res=> setComments(res.data))
       
    }, [_id]);

    return (
        <div
            key={_id}
            className="bg-[#187BD1] mx-6 text-white border-[1px] p-10 rounded-xl border-[#187BD1] hover:shadow-lg hover:bg-gradient-to-r from-[#00ffffad] to-[#187BD1] transition delay-500 duration-1000"
          >
            <div className="flex gap-5 items-center">
              <img
                src={image}
                alt="Author"
                className="w-[3rem] rounded-full border-[1px]  border-[#187BD1]"
              />
              <div className="flex-1">
                <div className="flex items-center">
                  {postTittle}{" "}
                  <RiVerifiedBadgeFill className="ml-3 mr-1" />
                  Post an update
                </div>
                <TimeAgo gettime={postedTime}></TimeAgo>
                <p>#{tag}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 justify-between items-center mt-10">
              <div className="flex  items-center gap-20">
                <div>
                  <ThumbUpAltRoundedIcon /> {upVote}
                </div>
                <div>
                  <ThumbDownAltRoundedIcon /> {downVote}
                </div>
              </div>
              <div>
                {comments?.length} comments <ModeCommentRoundedIcon style={{ marginLeft: 20 }} />
              </div>
            </div>
          </div>
    );
};

export default TimeLineCard;