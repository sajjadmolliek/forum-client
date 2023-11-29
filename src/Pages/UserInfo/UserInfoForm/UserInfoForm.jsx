/* eslint-disable react/prop-types */
import { Divider, Skeleton } from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import useAuthProvider from "../../../Hooks/useAuthProvider/useAuthProvider";
import useAxiousPublic from "../../../Hooks/useAxiousPublic/useAxiousPublic";
import { useQuery } from "@tanstack/react-query";

const UserInfoForm = () => {
  const { user } = useAuthProvider();
  const axiosPublic = useAxiousPublic();
  const email = user?.email;

  const { data: posts = [] } = useQuery({
    queryKey: ["AboutUser"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/aboutUser?email=${email}`);
      return res.data;
    },
  });

  const { name, aboutEmail, phone, address } = posts;

  return (
    <div className="m-10 mt-20">
      <div className="space-y-6 md:w-[35rem] mx-auto p-10 border-slate-500 hover:shadow-lg border-[1px] hover:border-0">
        <div className="flex justify-between">
          <h2 className="underline mb-10">Contact Info:</h2>
          <Link to={"/userProfile/editAbout"}>
            <FiEdit title="Edit Your Profile" />
          </Link>
        </div>
        <p>
          Name:{" "}
          <span className={name ? "ml-10 " : "md:ml-10 opacity-30"}>
            {name ? (
              name
            ) : (
              <div>
                <p>Fill Up</p>
                <Skeleton />
              </div>
            )}
          </span>
        </p>
        <Divider />
        <p>
          Email:{" "}
          <span className={aboutEmail ? "ml-10 " : "md:ml-10 opacity-30"}>
            {aboutEmail ? (
              aboutEmail
            ) : (
              <div>
                <p>Fill Up your Email</p>
                <Skeleton />
              </div>
            )}
          </span>
        </p>
        <Divider />
        <p>
          Phone:{" "}
          <span className={phone ? "ml-10 " : "md:ml-10 opacity-30"}>
            {phone ? (
              phone
            ) : (
              <div>
                <p>Fill Up your Number</p>
                <Skeleton />
              </div>
            )}
          </span>
        </p>
        <Divider />
        <p>
          Address:{" "}
          <span className={address ? "ml-10 " : "md:ml-10 opacity-30"}>
            {address ? (
              address
            ) : (
              <div>
                <p>Fill Up your Address</p>
                <Skeleton />
              </div>
            )}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserInfoForm;
