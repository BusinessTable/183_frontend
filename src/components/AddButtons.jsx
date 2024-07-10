import React from "react";
import { Paper, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddButtons({ setOpenAddDialog }) {
  return (
    <Paper sx={{ position: "absolute", bottom: "20px", right: "20px" }}>
      <IconButton onClick={() => setOpenAddDialog(true)} color="primary" aria-label="add password">
        <AddIcon fontSize="large" />
      </IconButton>
    </Paper>
  );
}
