// import * as React from 'react';
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
// import { useState } from "react";

export default function CustomizedInputBase() {
  // const [searchData,setSearchData] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    
    console.log(data);
  };
  return (
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
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search post by tags"
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
  );
}
