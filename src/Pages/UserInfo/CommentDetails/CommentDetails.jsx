import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useParams } from "react-router-dom";
import useAxiousPublic from "../../../Hooks/useAxiousPublic/useAxiousPublic";
// import useAuthProvider from '../../../Hooks/useAuthProvider/useAuthProvider';
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Button, TableHead, Tooltip } from "@mui/material";
import Select from "react-select";
// import Swal from "sweetalert2";
import HeaderTittle from "../../../Components/Shared/HeaderTittle/HeaderTittle";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const options = [
  { value: "chocolate", label: "Harassment or Threats" },
  { value: "strawberry", label: "Contains Offensive Content" },
  { value: "vanilla", label: "Violates Community Guidelines" },
];

const CommentDetails = () => {
  const axiosPublic = useAxiousPublic();
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [feedbackGiven, setFeedbackGiven] = React.useState({});
  const [fullComment, setFullComment] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (commentId, comment) => {
    setOpen(true);
    setFullComment({ ...fullComment, comment });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleFeedbackChange = (commentId, feedback) => {
    setFeedbackGiven((prevFeedback) => ({
      ...prevFeedback,
      [commentId]: feedback,
    }));
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const handleReport = () => {
    console.log(selectedOption.label);
    setFeedbackGiven({});
  };

  const headCells = [
    {
      id: "01",
      label: "Sl NO",
    },
    {
      id: "02",
      label: "Commenter Email",
    },
    {
      id: "03",
      label: "Comment",
    },
    {
      id: "04",
      label: "Feedback",
    },
    {
      id: "04",
      label: "Report",
    },
  ];

  const paramsId = useParams();
  const id = paramsId.id;

  const { data: comment } = useQuery({
    queryKey: ["allComments"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/comments/${id}`);
      return res.data;
    },
  });
  if (comment?.length > 0) {
    return (
      <Box sx={{ width: "100%", mt: 10 }}>
        <HeaderTittle
          heading={"All Comments in this Post"}
          tittle={"Comments"}
        ></HeaderTittle>
        <Paper sx={{ width: "100%", mb: 2, pl: 2, pr: 2 }}>
          <TableContainer sx={{ height: "calc(100vh - 200px)" }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      sx={{ pl: 2, w: 20, textAlign: "center" }}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {comment
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      hover
                      role="list"
                      key={row._id}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell sx={{ pl: 2, w: 20, textAlign: "center" }}>
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        sx={{ textAlign: "center" }}
                      >
                        {row.commenter}
                      </TableCell>
                      <TableCell align="right" sx={{ textAlign: "center" }}>
                        {/* Truncate comment and show Read More link */}
                        {row.comment.length > 20 ? (
                          <>
                            {row.comment.slice(0, 20)} ...
                            <span
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() =>
                                handleClickOpen(row._id, row.comment)
                              }
                              // onClick={handleOpen}
                            >
                              Read More
                            </span>
                          </>
                        ) : (
                          row.comment
                        )}
                      </TableCell>
                      <TableCell align="right" sx={{ textAlign: "center" }}>
                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Give Feedback</span>
                          </label>
                          <Select
                            defaultValue={selectedOption}
                            onChange={(option) => {
                              setSelectedOption(option);
                              handleFeedbackChange(row._id, option.label);
                            }}
                            options={options}
                          />
                        </div>
                      </TableCell>

                      <TableCell align="right" sx={{ textAlign: "center" }}>
                        <Tooltip title="Send Report">
                          <Button
                            variant="outlined"
                            disabled={!feedbackGiven[row._id]}
                            onClick={() => handleReport(row)}
                          >
                            Report
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                {Object.keys(fullComment).map((commentId) => (
                  <React.Fragment key={commentId}>
                    <Dialog
                      open={open}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>{"Explore Full Comment..."}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          {fullComment.comment}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                      </DialogActions>
                    </Dialog>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={comment?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    );
  } else {
    return (
      <div className="flex justify-center items-center"><h1 className="text-center text-3xl underline pb-10 font-mono font-bold">
      No Comments in this relevant post
    </h1></div>
    );
  }
};

export default CommentDetails;
