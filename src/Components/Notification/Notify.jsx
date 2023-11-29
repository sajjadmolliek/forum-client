import { useQuery } from "@tanstack/react-query";
import useAxiousPublic from "../../Hooks/useAxiousPublic/useAxiousPublic";

const Notify = () => {
  const axiosPublic = useAxiousPublic();
  const { data: notifications = [] } = useQuery({
    queryKey: ["announcementRoute"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/announcement`);
      return res.data;
    },
  });

  console.log(notifications);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 mt-20 max-w-7xl mx-auto items-center justify-center">
      {notifications.map((notification) => (
        <div key={notification._id}>
          <div className=" p-10 border-[1px] hover:shadow-xl hover:bg-blue-500 hover:text-white hover:rounded-xl hover:border-0 w-[25rem] h-56 mb-10">
            <p><span className="text-lg font-semibold">Topic:</span> {notification.tittle}</p>
            <p><span className="text-lg font-semibold">Notice:</span> {notification.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notify;
