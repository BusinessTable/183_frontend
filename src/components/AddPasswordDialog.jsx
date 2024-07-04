import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

export default function AddPasswordDialog({ open, onClose, onAddPassword, editPassword, onUpdatePassword }) {
  const initialPasswordData = {
    username: "",
    pwd: "",
    url: "",
    notes: "",
  };

  const [passwordData, setPasswordData] = useState(initialPasswordData);

  useEffect(() => {
    if (editPassword) {
      setPasswordData({
        username: editPassword.password.username,
        pwd: editPassword.password.pwd,
        url: editPassword.password.url,
        notes: editPassword.password.notes,
      });
    } else {
      setPasswordData(initialPasswordData);
    }
  }, [editPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddOrUpdatePassword = () => {
    if (editPassword) {
      onUpdatePassword(passwordData);
    } else {
      onAddPassword(passwordData);
    }
    // Reset passwordData to initial state after adding or updating
    setPasswordData(initialPasswordData);
    onClose(); // Close dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editPassword ? "Edit Password" : "Add Password"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Username"
          variant="outlined"
          name="username"
          value={passwordData.username}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Password"
          variant="outlined"
          name="pwd"
          type="password"
          value={passwordData.pwd}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="URL"
          variant="outlined"
          name="url"
          value={passwordData.url}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Notes"
          variant="outlined"
          name="notes"
          value={passwordData.notes}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddOrUpdatePassword} color="primary" variant="contained">
          {editPassword ? "Update Password" : "Add Password"}
        </Button>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
