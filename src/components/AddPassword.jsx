import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function AddPassword() {
  const [passwordData, setPasswordData] = useState({
    username: "",
    pwd: "",
    url: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPassword = () => {
    // Add your logic to handle adding a new password here
    console.log("New password data:", passwordData);
    // Clear the input fields
    setPasswordData({
      username: "",
      pwd: "",
      url: "",
      notes: "",
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
      <Button variant="contained" color="primary" onClick={handleAddPassword}>
        Add Password
      </Button>
    </Box>
  );
}
