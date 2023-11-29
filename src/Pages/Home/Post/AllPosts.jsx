/* eslint-disable react/prop-types */
import HeaderTittle from "../../../Components/Shared/HeaderTittle/HeaderTittle";
import { AwesomeButton } from "react-awesome-button";
import PostCard from "./PostCard";
// import { useEffect, useState } from "react";

const AllPosts = ({posts}) => {
  
  //   const [posts, setPosts] = useState([]);
  //   const [posts, setPosts] = useState(data);

  //  <---------------Work For Pagination------------->
  //   const [count, setCount] = useState(0);

  //   const [itemsPerPage, setItemsPerPage] = useState(5);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const numberOfPage = Math.ceil(count / itemsPerPage);
  //   const pages = [];
  //   for (let i = 1; i < numberOfPage + 1; i++) {
  //     pages.push(i);
  //   }
  //  <---------------End Work For Pagination------------->


  // console.log(count)
  //  <---------------Work For Pagination------------->
  //   const link1 = `/posts/pagination?&page=${currentPage}&size=${itemsPerPage}`;
  //   useEffect(() => {
  //     axiosPublic.get(link1).then((data) => setPosts(data.data));
  //   }, [axiosPublic,link1]);

  //   const handleChangePage = (e) => {
  //     const valueOfChangePage = parseInt(e.target.value);
  //     setItemsPerPage(valueOfChangePage);
  //     setCurrentPage(1);
  //   };
  //   const handlePageClick = (page) => {
  //     setCurrentPage(page);
  //   };
  //   const handlePrevious = () => {
  //     if (currentPage > 1) {
  //       setCurrentPage(currentPage - 1);
  //     }
  //   };
  //   const handleNext = () => {
  //     if (currentPage < numberOfPage) {
  //       setCurrentPage(currentPage + 1);
  //     }
  //   };

  //  <---------------End Work For Pagination------------->

  return (
    <div>
      <HeaderTittle heading={"All Posts"} tittle={"post"} />
      <div className="flex justify-end mb-6 mr-24">
        <AwesomeButton type="primary">
          <span>
            Sort by:
            {/* {vot ? "Up Vote" : "Down Vote"}{" "} */}
          </span>
        </AwesomeButton>
      </div>
      <div className="grid grid-cols-1  lg:w-[85rem] mx-auto gap-6 mb-10">
        {posts?.map((post) => (
          <div key={post._id}>
            <PostCard post={post}></PostCard>
          </div>
        ))}
      </div>




      
      {/* //  <--------------- Work For Pagination-------------> */}
      {/* <div className="pagination flex flex-wrap justify-center items-center my-20">
        <button
          onClick={handlePrevious}
          className="btn bg-[#158CD7] text-white mr-1"
        >
          Previous
        </button>
        <div className="mx-1 inline">
          {pages?.map((page) => (
            <button
              className={
                page == currentPage
                  ? "btn selected bg-[#2F0F00] text-white mx-2"
                  : "btn bg-[#158CD7] text-white mx-2"
              }
              onClick={() => handlePageClick(page)}
              key={page}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="btn bg-[#158CD7] text-white mr-3 ml-1"
        >
          Next
        </button>
      </div> */}

      {/* //  <---------------End Work For Pagination-------------> */}
    </div>
  );
};

export default AllPosts;
