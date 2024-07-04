import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getPasswordsPage, deletePassword, updatePassword, addPassword } from "../functions/passwordHandler";
import AddPasswordDialog from "../components/AddPasswordDialog";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Dashboard() {
  const { logout, authed } = useAuth();
  const [rows, setRows] = useState([]);
  const [pageNumbers, setPageNumbers] = useState(1);
  const [page, setPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(true);
  const [editPassword, setEditPassword] = useState(null); // State for editing password
  const [refreshFlag, setRefreshFlag] = useState(false); // State to trigger data refresh
  const [openAddDialog, setOpenAddDialog] = useState(false); // State for opening Add Password dialog
  const navigate = useNavigate();

  useEffect(() => {
    fetchPasswords();
  }, [authed, page, refreshFlag]); // Trigger fetch on authed, page, or refreshFlag change

  const fetchPasswords = () => {
    getPasswordsPage(authed, page).then((data) => {
      setRows(data.passwords);
      setPageNumbers(data.totalPages);
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleDelete = async (uuid) => {
    await deletePassword(authed, uuid);
    setRefreshFlag((prevFlag) => !prevFlag);
  };

  const handleEdit = (password) => {
    setEditPassword(password);
    setOpenAddDialog(true); // Open dialog for editing
  };

  const handleUpdatePassword = async (updatedPasswordData) => {
    try {
      await updatePassword(authed, editPassword.uuid, updatedPasswordData);
      setEditPassword(null); // Clear edit mode
      setRefreshFlag((prevFlag) => !prevFlag); // Refresh password list
      setOpenAddDialog(false); // Close dialog after updating
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleAddPassword = async (newPasswordData) => {
    try {
      await addPassword(authed, newPasswordData);
      setRefreshFlag((prevFlag) => !prevFlag); // Refresh password list
      setOpenAddDialog(false); // Close dialog after adding
    } catch (error) {
      console.error("Error adding password:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={openDrawer}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3} style={{ display: "flex", flexDirection: "row-reverse" }}>
            <Grid item xs={12}>
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
                          <IconButton onClick={() => handleEdit(row)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(row.uuid)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Pagination count={pageNumbers} page={page} size="small" onChange={handlePageChange} />
          </Grid>
        </Container>
      </Box>
      <Paper sx={{ position: "absolute", bottom: "20px", right: "20px" }}>
        <IconButton onClick={() => setOpenAddDialog(true)} color="primary" aria-label="add password">
          <AddIcon fontSize="large"/>
        </IconButton>
      </Paper>
      <AddPasswordDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onAddPassword={handleAddPassword}
        editPassword={editPassword}
        onUpdatePassword={handleUpdatePassword}
      />
    </Box>
  );
}
