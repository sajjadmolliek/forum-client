import useAxiousPublic from "../../../Hooks/useAxiousPublic/useAxiousPublic";
import banner from "../../../assets/banner.jpg";
import Tags from "../Tags/Tags";
import { Parallax } from "react-parallax";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AwesomeButton } from "react-awesome-button";
import HeaderTittle from "../../../Components/Shared/HeaderTittle/HeaderTittle";
import PostCard from "../Post/PostCard";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";

const Home = () => {
  const axiosPublic = useAxiousPublic();
  const [search, setSearch] = useState("all");
  const [sort, setSort] = useState(true);
  const [posts, setPosts] = useState([]);

  const handleShowall = () => {
    axiosPublic
      .get(`/posts/allPost?search=${search}`)
      .then((res) => setPosts(res.data));
  };
  const handleUpsort = () => {
    axiosPublic.get(`/sort/upvote`).then((res) => {
      setPosts(res.data);
      setSort(false);
    });
  };
  const handleDownSort = () => {
    axiosPublic.get(`/sort/downvote`).then((res) => {
      setPosts(res.data);
      setSort(true);
    });
  };

  useEffect(() => {
    axiosPublic
      .get(`/posts/allPost?search=${search}`)
      .then((res) => setPosts(res.data));
  }, [axiosPublic, search]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (data?.search) {
      axiosPublic.get(`/posts/allPost?search=${data?.search}`).then((res) => {
        if (res?.data?.length === 0) {
          Swal.fire(
            "Opps!!!!",
            "Please,Input The suggest Tag To Search",
            "error"
          );
        }
        setPosts(res.data);
        reset();
      });
    }
  };

  return (
    <div>
      <div>
        <Parallax
          blur={{ min: -50, max: 50 }}
          bgImage={banner}
          bgImageAlt="Bg Img"
          strength={-100}
          className="mb-20"
        >
          <div className="hero h-[40rem]">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="flex-col hero-content text-center text-neutral-content h-[20rem] bg-[#bcb6b6] bg-opacity-20 py-20 w-full">
              <div className="max-w-xl ">
                <h1 className="mb-5 text-xl md:text-3xl font-bold uppercase w-full">
                  {"Your Space for All Discussions"}
                </h1>
                <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
              </div>
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
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search post by tags"
                  // inputProps={{ "aria-label": "search google maps" }}
                  {...register("search", { required: true })}
                />
                {errors.search?.type === "required" && (
                  <span className="text-red-600">This field is required !</span>
                )}
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </div>
          </div>
          {/* <div style={{ height: '50px' }} /> */}
        </Parallax>
      </div>
      <br />
      <Tags></Tags>
      <br />
      <br />
      <br />
      <HeaderTittle heading={"All Posts"} tittle={"post"} />
      <div className="flex justify-end gap-4 mb-6 mr-24">
        {sort ? (
          <AwesomeButton type="primary">
            <span onClick={handleUpsort}>Sort by: Like <ThumbUpAltRoundedIcon /></span>
          </AwesomeButton>
        ) : (
          <AwesomeButton type="primary">
            <span onClick={handleDownSort}>Sort by: Dislike <ThumbDownAltRoundedIcon /></span>
          </AwesomeButton>
        )}
        <AwesomeButton type="primary">
          <span onClick={handleShowall}>Show All</span>
        </AwesomeButton>
      </div>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1  lg:w-[85rem] mx-auto gap-6 mb-10">
          {posts?.map((post) => (
            <div key={post._id}>
              <PostCard post={post}></PostCard>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-center text-3xl underline pb-10 font-mono font-bold">
            {" "}
            <p>Sorry No Relevant Post Or</p>
            <br /> You should properly use this <br /> <br /> Tags to search
            which is given
          </h1>
        </div>
      )}

      {/* <AllPosts posts={posts}></AllPosts> */}
    </div>
  );
};

export default Home;
