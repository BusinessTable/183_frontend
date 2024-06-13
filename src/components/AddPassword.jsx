import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { addPassword } from '../functions/passwordHandler';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';

export default function AddPassword() {
  const navigate = useNavigate();
  const { authed } = useAuth();
  const [passwordData, setPasswordData] = useState({
    username: '',
    pwd: '',
    url: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPassword = () => {
    // adding new password
    addPassword(authed, passwordData).finally(() => navigate(0));
    // Clear the input fields
    setPasswordData({
      username: '',
      pwd: '',
      url: '',
      notes: '',
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
