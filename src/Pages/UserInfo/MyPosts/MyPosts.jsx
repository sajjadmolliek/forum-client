import * as React from "react";
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
import { TableHead, Tooltip } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiousPublic from "../../../Hooks/useAxiousPublic/useAxiousPublic";
import useAuthProvider from "../../../Hooks/useAuthProvider/useAuthProvider";
import HeaderTittle from "../../../Components/Shared/HeaderTittle/HeaderTittle";
import { Link } from "react-router-dom";

const MyPosts = () => {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const axiosPublic = useAxiousPublic();
  const { user } = useAuthProvider();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const headCells = [
    {
      id: "01",
      label: "Sl NO",
    },
    {
      id: "02",
      label: "Post Tittle",
    },
    {
      id: "03",
      label: "Number of votes",
    },
    {
      id: "04",
      label: "Comment Button",
    },
    {
      id: "04",
      label: "Delete Button",
    },
  ];

  const { data: tableData = [], refetch } = useQuery({
    queryKey: ["PostInMyPost"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/posts/myPosts?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete =  (post) => {
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then( async (result) => {
      
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/deletePost/${post._id}`)
        // .then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Item has been deleted.",
              icon: "success",
            });
          }
        // });
      }
    });
  };

  return (
    <Box sx={{ width: "100%", mt: 10 }}>
      <HeaderTittle heading={"My Posts"} tittle={"Posts"}></HeaderTittle>
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
              {tableData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                      {row.postTittle}
                    </TableCell>
                    <TableCell align="right" sx={{ textAlign: "center" }}>
                      {row.upVote}
                    </TableCell>
                      <TableCell align="right" sx={{ textAlign: "center" }}>
                    <Link to={`/userProfile/commentDetails/${row._id}`}>
                    <Tooltip title="Comment">
                   
                    <CommentRoundedIcon />
                      </Tooltip>
                        
                    </Link>
                      </TableCell>
                    <TableCell align="right" sx={{ textAlign: "center" }}>
                      <Tooltip title="Delete">
                        <DeleteRoundedIcon onClick={() => handleDelete(row)} />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={tableData.length}
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
};

export default MyPosts;
