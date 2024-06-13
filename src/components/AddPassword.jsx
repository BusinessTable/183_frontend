import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function AddPassword() {
  const [password, setPassword] = useState("");

  const handleAddPassword = () => {
    // Add your logic to handle adding a new password here
    console.log("New password added:", password);
    setPassword("");  // Clear the input field
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="New Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleAddPassword}>
        Add Password
      </Button>
    </Box>
  );
}
