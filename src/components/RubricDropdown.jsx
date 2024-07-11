import React from "react";
import {
  Autocomplete,
  TextField,
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
  ListItem,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddButtons from "./AddButtons";

export default function RubricDropdown({ rubrics, handleEditRubric, handleAddRubric, handleRubricSelection }) {
  const onChange = (event, newValue) => {
    handleRubricSelection(newValue);
  };

  const isOptionEqualToValue = (option, value) => option.uuid === value.uuid;

  return (
    <Paper sx={{ display: "flex" }}>
      <AddButtons onClick={handleAddRubric} />
      <Autocomplete
        sx={{ flex: 1 }}
        options={rubrics}
        getOptionLabel={(rubric) => rubric.name}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => <TextField {...params} label="Rubrics" />}
        renderOption={(props, rubric) => (
          <ListItem {...props} key={rubric.uuid} component="div">
            <ListItemText primary={rubric.name} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleEditRubric(rubric)}>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
        onChange={onChange}
      />
    </Paper>
  );
}
