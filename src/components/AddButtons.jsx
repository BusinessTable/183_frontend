import React from "react";
import { Paper, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddButtons({ onClick, sx }) {
  return (
    <Paper sx={sx}>
      <IconButton onClick={onClick} color="primary" aria-label="add">
        <AddIcon fontSize="large" />
      </IconButton>
    </Paper>
  );
}
