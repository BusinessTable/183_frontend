import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PasswordTable({ rows, handleEditPassword, handleDeletePassword }) {
  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.password.username}</TableCell>
              <TableCell>{row.password.pwd}</TableCell>
              <TableCell>{row.password.url}</TableCell>
              <TableCell>{row.password.notes}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEditPassword(row)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeletePassword(row.uuid)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
