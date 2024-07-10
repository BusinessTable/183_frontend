import React from "react";
import { Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RubricsList({ rubrics, handleEditRubric, handleDeleteRubric, setOpenAddRubricDialog }) {
  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Typography variant="h6">Rubrics</Typography>
      <List>
        {rubrics.map((rubric) => (
          <ListItem key={rubric.uuid}>
            <ListItemText primary={rubric.name} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleEditRubric(rubric)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteRubric(rubric.uuid)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={() => setOpenAddRubricDialog(true)}>
        Add Rubric
      </Button>
    </Paper>
  );
}
