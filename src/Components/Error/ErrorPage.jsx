import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div
        className="flex justify-center items-center mt-[45%] md:mt-[15%]"
        id="error-page"
      >
        <div>
          <h1 className="text-center font-bold text-4xl">OOPS!</h1>
          <p className="my-5 font-semibold text-lg">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="text-center font-medium text-base">No Data Found</p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-5">
        <NavLink to="/">
        <Button sx={{ '&:hover': { backgroundColor: 'blue',color:"white" } }} variant="outlined">
        Back to Home
      </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
