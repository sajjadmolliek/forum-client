import { useQuery } from "@tanstack/react-query";
import useAxiousPublic from "../../../Hooks/useAxiousPublic/useAxiousPublic";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import { Button } from "@mui/material";

const ReportedComments = () => {
  const axiosPublic = useAxiousPublic();

  const { data: reports } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reports`);
      return res.data;
    },
  });

  const handleMembership = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Remove His Membership Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.patch(`/membershipCancel/${email}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Update!",
              text: `( ${email} ) is bronze Member Now`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="flex flex-wrap mx-auto gap-6 justify-center items-center ">
      {reports?.map((report) => (
        <Card key={report?._id} className="mb-8 w-[70rem] hover:shadow-xl">
          <CardContent>
            <div className="flex justify-between items-center">
              <Typography gutterBottom variant="h6" component="div">
                Reporter Name: {report?.reporterName}
              </Typography>
              <Typography gutterBottom variant="h7" component="div">
                Reporter Email: {report?.reporter}
              </Typography>
            </div>
            <div className="flex justify-between items-center">
              <Typography gutterBottom variant="h7" component="div">
                Comment Id: {report?.commentId}
              </Typography>
              <Typography gutterBottom variant="h7" component="div">
                Commenter Email: {report?.commenter}
              </Typography>
            </div>
            <div>
              <Typography gutterBottom variant="h7" component="div">
                Comment: {report?.comment}
              </Typography>
              <Typography gutterBottom variant="h7" component="div">
                Report: {report?.report}
              </Typography>
            </div>
          </CardContent>
          <CardActions className="w-full flex justify-center">
            <Button
              variant="outlined"
              onClick={() => handleMembership(report?.commenter)}
            >
              Cancel Membership
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ReportedComments;
