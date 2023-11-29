import useAxiousPublic from "../../../Hooks/useAxiousPublic/useAxiousPublic";
import { useQuery } from "@tanstack/react-query";
import useAuthProvider from "../../../Hooks/useAuthProvider/useAuthProvider";
import TimeLineCard from "./TimeLineCard";

const TimeLine = () => {
  // const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiousPublic();
  const { user } = useAuthProvider();
  const { data: posts = [] } = useQuery({
    queryKey: ["myPost"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/posts/timeline?email=${user?.email}`);
      return res.data;
    },
  });
  const firstThreeElements = posts.slice(0, 3);
  return (
    <div>
      <div className="flex justify-end mb-6 mr-24"></div>
      <div className="grid lg:grid-cols-2 lg:w-[85rem] mx-auto gap-6">
        {firstThreeElements.map((post) => (
          <TimeLineCard key={post?._id} post={post}></TimeLineCard>
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
