import { Badge } from "@mui/material";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import useAxiousPublic from "../../../Hooks/useAxiousPublic/useAxiousPublic";
import useAuthProvider from "../../../Hooks/useAuthProvider/useAuthProvider";
import { useQuery } from "@tanstack/react-query";

const UserProFIle = () => {
  const axiosPublic = useAxiousPublic();
  const { user } = useAuthProvider();

  const email = user?.email;
  const { data: posts = [] } = useQuery({
    queryKey: ["AboutUser"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/admin?email=${email}`);
      return res.data;
    },
  });

  return (
    <div className="bg-black text-white md:flex justify-center md:justify-start md:items-center -mt-12 mb-14 p-10">
      <img
        className="md:w-[15rem] rounded-full border-2 border-sky-200 p-1 mx-auto md:mx-0"
        src={user?.photoURL}
        alt="User"
      />
      <div className="md:flex text-center mt-10 md:mt-0 space-y-6 md:ml-10 items-center flex-col">
        <div className="md:flex md:space-x-3 justify-center">
          <p className="md:text-4xl text-xl mb-6 md:mb-0">
            {user?.displayName}
          </p>
          <div>
            {posts?.membership === "gold" ? (
              <Badge badgeContent={"Gold"} sx={{ color: "gold" }}>
                <MilitaryTechIcon sx={{ color: "gold", fontSize: "1.5rem" }} />
                <MilitaryTechIcon sx={{ color: "gold", fontSize: "1.5rem" }} />
                <MilitaryTechIcon
                  sx={{ mr: 2, color: "gold", fontSize: "1.5rem" }}
                />
              </Badge>
            ) : (
              <>
                <Badge badgeContent={"Bronze"} sx={{ color: "#AA8954" }}>
                  <MilitaryTechIcon
                    sx={{ color: "#AA8954", fontSize: "1.5rem" }}
                  />

                  <MilitaryTechIcon
                    sx={{ color: "#AA8954", fontSize: "1.5rem" }}
                  />

                  <MilitaryTechIcon
                    sx={{ mr: 2, color: "#AA8954", fontSize: "1.5rem" }}
                  />
                </Badge>
              </>
            )}
          </div>
        </div>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserProFIle;
