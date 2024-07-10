import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import {
  CssBaseline,
  Box,
  Toolbar,
  IconButton,
  Container,
  Grid,
  Paper,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from "@mui/material";
import {
  getPasswordsPage,
  deletePassword,
  updatePassword,
  addPassword,
  getRubriks,
  createRubrik,
  deleteRubrik,
  updateRubrik,
  addPasswordToRubrik,
  removePasswordFromRubrik,
} from "../functions/passwordHandler"; // Adjust imports as per your file structure
import AddPasswordDialog from "../components/AddPasswordDialog";
import AddRubricDialog from "../components/AddRubricDialog";
import useAuth from "../hooks/useAuth";

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
  const [rubrics, setRubrics] = useState([]); // State to store rubrics
  const [openAddRubricDialog, setOpenAddRubricDialog] = useState(false); // State for opening Add Rubric dialog

  useEffect(() => {
    fetchPasswords();
    fetchRubrics();
  }, [authed, page, refreshFlag]); // Trigger fetch on authed, page, or refreshFlag change

  const fetchPasswords = () => {
    getPasswordsPage(authed, page).then((data) => {
      setRows(data.passwords);
      setPageNumbers(data.totalPages);
    });
  };

  const fetchRubrics = () => {
    getRubriks(authed).then((data) => {
      setRubrics(data);
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleDeletePassword = async (uuid) => {
    await deletePassword(authed, uuid);
    setRefreshFlag((prevFlag) => !prevFlag);
  };

  const handleEditPassword = (password) => {
    setEditPassword(password);
    setOpenAddDialog(true); // Open dialog for editing
  };

  const handleUpdatePassword = (updatedPasswordData) => {
    updatePassword(authed, editPassword.uuid, updatedPasswordData);
    setEditPassword(null); // Clear edit mode
    setRefreshFlag((prevFlag) => !prevFlag); // Refresh password list
    setOpenAddDialog(false); // Close dialog after updating
  };

  const handleAddPassword = (newPasswordData) => {
    addPassword(authed, newPasswordData);
    setRefreshFlag((prevFlag) => !prevFlag); // Refresh password list
    setOpenAddDialog(false); // Close dialog after adding
  };

  const handleDeleteRubric = async (uuid) => {
    await deleteRubrik(authed, uuid);
    setRefreshFlag((prevFlag) => !prevFlag); // Refresh rubrics list
  };

  const handleEditRubric = (rubric) => {
    // Implement if needed
  };

  const handleUpdateRubric = (uuid, newRubrik) => {
    updateRubrik(authed, uuid, newRubrik);
    setRefreshFlag((prevFlag) => !prevFlag); // Refresh rubrics list
  };

  const handleAddRubric = (rubrik) => {
    createRubrik(authed, rubrik);
    setRefreshFlag((prevFlag) => !prevFlag); // Refresh rubrics list
    setOpenAddRubricDialog(false); // Close dialog after adding
  };

  const handleAddPasswordToRubric = (rubricUUID, passwordUUID) => {
    addPasswordToRubrik(authed, rubricUUID, passwordUUID);
    setRefreshFlag((prevFlag) => !prevFlag); // Refresh rubrics list
  };

  const handleRemovePasswordFromRubric = (rubricUUID, passwordUUID) => {
    removePasswordFromRubrik(authed, rubricUUID, passwordUUID);
    setRefreshFlag((prevFlag) => !prevFlag); // Refresh rubrics list
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
            </Grid>
            <Pagination count={pageNumbers} page={page} size="small" onChange={handlePageChange} />
          </Grid>
        </Container>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Rubrics</Typography>
                <List>
                  {rubrics.map((rubric) => (
                    <ListItem key={rubric.uuid}>
                      <ListItemText primary={rubric.name} />
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => handleEditRubric(rubric)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteRubric(rubric.uuid)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                <Button variant="contained" color="primary" onClick={() => setOpenAddRubricDialog(true)}>
                  Add Rubric
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Paper sx={{ position: "absolute", bottom: "20px", right: "20px" }}>
        <IconButton onClick={() => setOpenAddDialog(true)} color="primary" aria-label="add password">
          <AddIcon fontSize="large" />
        </IconButton>
      </Paper>
      <AddPasswordDialog
        open={openAddDialog}
        onClose={() => {
          setOpenAddDialog(false);
          setEditPassword(null);
        }}
        onAddPassword={handleAddPassword}
        editPassword={editPassword}
        onUpdatePassword={handleUpdatePassword}
      />
      <AddRubricDialog
        open={openAddRubricDialog}
        onClose={() => setOpenAddRubricDialog(false)}
        onAddRubric={handleAddRubric}
      />
    </Box>
  );
}
