import { useQuery } from "@tanstack/react-query";
import useAxiousPublic from "../../../Hooks/useAxiousPublic/useAxiousPublic";
import { IconButton, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import Chart from "../../../Components/Chart/Chart";

const AdminProInfo = () => {
  const axiosPublic = useAxiousPublic();
  const [openTag, setOpenTag] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setOpenTag(false);
    const res = await axiosPublic.post(`/tags`, { Tags: data?.Tags });
    if (res.data.insertedId) {
      reset();
      Swal.fire("Congratulation!", "Successfully added Tag", "success");
      setOpenTag(true);
    }
  };

  const { data: AllUser = [] } = useQuery({
    queryKey: ["allUsersManage"],
    queryFn: async () => {
      const res1 = await axiosPublic.get(`/users/manage?uName=all`);

      return [res1.data];
    },
  });
  const { data: AllComments = [] } = useQuery({
    queryKey: ["AllCommentsCounts"],
    queryFn: async () => {
      const res3 = await axiosPublic.get(`/comment`);
      // console.log(res3.data)
      return [res3.data];
    },
  });
  const { data: AllPosts = [] } = useQuery({
    queryKey: ["AllPostManage"],
    queryFn: async () => {
      const res2 = await axiosPublic.get(`/totalPosts`);

      return [res2.data];
    },
  });
  const usersLength = AllUser[0]?.length
  const postsLength = AllPosts[0]?.length
  const commentsLength = AllComments[0]?.length

  const all = {
    usersLength:usersLength,
    postsLength:postsLength,
    commentsLength:commentsLength,
  }
  return (
    <div>
      <div>
        <p>
          Total Users: <span>{AllUser[0]?.length}</span>
        </p>
      </div>
      <div>
        <p>
          Total Posts: <span>{AllPosts[0]?.length}</span>
        </p>
      </div>
      <div>
        <p>
          Total Comments: <span>{commentsLength}</span>
        </p>
      </div>


      <div>
        <Chart
        all={all}
        //  users={usersLength}
        //  posts={postsLength}
        //  comments={commentsLength}

        ></Chart>
      </div>

      <div>
        <Paper
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <TextField
            fullWidth
            label="Add Tags"
            id="fullWidth"
            {...register("Tags", { required: true })}
          />
          {openTag ? (
            <IconButton type="submit" sx={{ p: "10px",backgroundColor:"#1976D8",color:"white" }} aria-label="Tags">
              <Typography>Input</Typography>
            </IconButton>
          ) : (
            <IconButton disabled sx={{ p: "10px" }} aria-label="Tags">
              <Typography>Input</Typography>
            </IconButton>
          )}
          
        </Paper>
        {errors.Tags?.type === "required" && (
          <span className="text-red-600">This field is required !</span>
        )}
      </div>
    </div>
  );
};

export default AdminProInfo;
