import React from 'react';
import {
  Autocomplete,
  TextField,
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
  ListItem,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddButtons from './AddButtons';

export default function RubricDropdown({
  rubrics,
  handleEditRubric,
  handleAddRubric,
}) {
  return (
    <Paper sx={{ display: 'flex' }}>
      <AddButtons onClick={handleAddRubric} />
      <Autocomplete
        sx={{ flex: 1 }}
        options={rubrics}
        getOptionLabel={(rubric) => rubric.name}
        renderInput={(params) => <TextField {...params} label="Rubrics" />}
        renderOption={(props, rubric) => (
          <ListItem {...props} key={rubric.uuid}>
            <ListItemText primary={rubric.name} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleEditRubric(rubric)}>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      />
    </Paper>
  );
}
