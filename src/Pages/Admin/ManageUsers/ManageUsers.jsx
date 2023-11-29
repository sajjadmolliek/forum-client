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
import { Badge, TableHead, Tooltip } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";
import { AwesomeButton } from "react-awesome-button";
import { useEffect } from "react";

const ManageUsers = () => {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const axiosSecure = useAxiosSecure();
  const [search, setSearchAll] = React.useState("all");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setSearchAll(data.search);
    reset();
   
  };

  let {
    data: tableData = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["manage"],
    queryFn: async () => {
      let res = await axiosSecure.get(`/users/manage?uName=${search}`);
      if(res.data){
        console.log({"data Length":res.data.length})
      }
      return res.data;
    },
  });
  const handleShowAll = () => {
    setSearchAll("all");
    console.log("calling")
  };
  console.log({"table Length":tableData.length});
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
      label: "User Name",
    },
    {
      id: "03",
      label: "User Email",
    },
    {
      id: "04",
      label: "Role",
    },
    {
      id: "05",
      label: "Membership",
    },
  ];
console.log(search)
  const handleAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to give him as a rol of Admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Update!",
              text: `( ${user.name} ) is admin Now`,
              icon: "success",
            });
          }
        });
      }
    });
  };
console.log(isPending)



useEffect(()=>{
    refetch();
},[search])
  if (!isPending) {
    return (
      <div>
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <Paper
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, }}
              placeholder="Search by User name"
              // inputProps={{ "aria-label": "search google maps" }}
              {...register("search", { required: true })}
            />
            {errors.search?.type === "required" && (
              <span className="text-red-600">This field is required !</span>
            )}
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          <span onClick={handleShowAll}><AwesomeButton type="primary">Show All</AwesomeButton></span>
        </div>

        {tableData.length > 0 ? (
          <Box sx={{ width: "100%", mt: 10 }}>
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
                            {row.name}
                          </TableCell>
                          <TableCell align="right" sx={{ textAlign: "center" }}>
                            {row.email}
                          </TableCell>
                          <TableCell align="right" sx={{ textAlign: "center" }}>
                            {row?.role ? (
                              <Tooltip title="Admin">
                                <AdminPanelSettingsIcon />
                              </Tooltip>
                            ) : (
                              <Tooltip title="Make Admin">
                                <PersonAddAltIcon
                                  onClick={() => handleAdmin(row)}
                                />
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell align="right" sx={{ textAlign: "center" }}>
                            {row?.membership === "bronze" ? (
                              <Tooltip title="Bronze Member">
                                <Badge
                                  badgeContent={"Bronze"}
                                  sx={{ color: "#AA8954" }}
                                >
                                  <MilitaryTechIcon
                                    sx={{
                                      mr: 2,
                                      color: "#AA8954",
                                      fontSize: "1.5rem",
                                    }}
                                  />
                                </Badge>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Bronze Member">
                                <Badge
                                  badgeContent={"Gold"}
                                  sx={{ color: "gold" }}
                                >
                                  <MilitaryTechIcon
                                    sx={{
                                      mr: 2,
                                      color: "gold",
                                      fontSize: "1.5rem",
                                    }}
                                  />
                                </Badge>
                              </Tooltip>
                            )}
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
        ) : (
          <div className="flex justify-center min-h-screen items-center font-bold text-xl md:text-3xl">
            No Result Match
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex justify-center min-h-screen items-center">
        <HashLoader color="#1976D2" />
      </div>
    );
  }
};

export default ManageUsers;
