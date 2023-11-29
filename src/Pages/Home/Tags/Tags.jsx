import { useQuery } from "@tanstack/react-query";
import useAxiousPublic from "../../../Hooks/useAxiousPublic/useAxiousPublic";

const Tags = () => {

  const axiosPublic = useAxiousPublic();
  const { data: tags = [] } = useQuery({
    queryKey: ["allTags"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tags`);
      
      return res?.data;
    },
  });
  
  return (
    <div>
      <h1 className="text-center text-3xl underline pb-10 font-mono font-bold">You should use this Tags to search</h1>
      <div className="flex flex-wrap justify-center items-center gap-6 p-10 border-[1px] hover:shadow-xl hover:border-0">
        {tags?.map((tag) => (
          <div key={tag?._id}>
            <p
              className="border-[1px] p-3 bg-[#187BD1] text-white hover:rounded-lg"
              type="primary"
            >
              # {tag.Tags}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
