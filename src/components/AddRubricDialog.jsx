import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

export default function AddRubricDialog({ open, onClose, onAddRubric, editRubric, onUpdateRubric }) {
  const initialRubricData = {
    name: "",
  };

  const [rubricData, setRubricData] = useState(initialRubricData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRubricData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddOrUpdateRubric = () => {
    if (editRubric) {
      onUpdateRubric(editRubric.uuid, rubricData);
    } else {
      onAddRubric(rubricData);
    }
    setRubricData(initialRubricData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editRubric ? "Edit Rubric" : "Add Rubric"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Rubric Name"
          variant="outlined"
          name="name"
          value={rubricData.name}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddOrUpdateRubric} color="primary" variant="contained">
          {editRubric ? "Update Rubric" : "Add Rubric"}
        </Button>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
