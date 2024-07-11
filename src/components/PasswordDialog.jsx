import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  OutlinedInput,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

export default function PasswordDialog({
  open,
  onClose,
  onAddPassword,
  editPassword,
  onUpdatePassword,
  rubrics, // Array of rubrics to populate the dropdown
  onAddPasswordToRubrik, // Function to add password to rubric
}) {
  const initialPasswordData = {
    username: '',
    pwd: '',
    url: '',
    notes: '',
    rubricUUID: '', // New field to hold the selected rubric UUID
  };

  const [passwordData, setPasswordData] = useState(initialPasswordData);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (editPassword) {
      setPasswordData({
        username: editPassword.password.username,
        pwd: editPassword.password.pwd,
        url: editPassword.password.url,
        notes: editPassword.password.notes,
        rubricUUID: editPassword.password.rubricUUID || '', // Ensure rubricUUID is initialized
      });
    } else {
      setPasswordData(initialPasswordData);
    }
  }, [editPassword]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();

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

  const handleRubricChange = (e) => {
    setPasswordData((prevData) => ({
      ...prevData,
      rubricUUID: e.target.value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {editPassword ? 'Edit Password' : 'Add Password'}
      </DialogTitle>
      <DialogContent
        sx={{
          gap: '10px',
          display: 'flex',
          flexDirection: 'column',
          width: '50vw',
          maxWidth: '600px',
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          name="username"
          value={passwordData.username}
          onChange={handleChange}
          fullWidth
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            name="pwd"
            value={passwordData.pwd}
            onChange={handleChange}
            fullWidth
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
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
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="rubric-select-label">Rubric</InputLabel>
          <Select
            labelId="rubric-select-label"
            id="rubric-select"
            value={passwordData.rubricUUID}
            onChange={handleRubricChange}
            label="Rubric"
          >
            {rubrics.map((rubric) => (
              <MenuItem key={rubric.uuid} value={rubric.uuid}>
                {rubric.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleAddOrUpdatePassword();
            onAddPasswordToRubrik(passwordData.rubricUUID); // Call function to add password to rubric
          }}
          color="primary"
          variant="contained"
        >
          {editPassword ? 'Update Password' : 'Add Password'}
        </Button>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
