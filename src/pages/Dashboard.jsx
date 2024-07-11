import React, { useState, useEffect } from "react";
import { CssBaseline, Box, Toolbar, Container, Grid } from "@mui/material";
import DrawerComponent from "../components/DrawerComponent";
import PasswordTable from "../components/PasswordTable";
import PaginationComponent from "../components/PaginationComponent";
import AddButtons from "../components/AddButtons";
import PasswordDialog from "../components/PasswordDialog"; // Updated import
import RubricDialog from "../components/RubricDialog";
import RubricDropdown from "../components/RubricDropdown";
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
} from "../functions/passwordHandler";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { authed } = useAuth();
  const [rows, setRows] = useState([]);
  const [pageNumbers, setPageNumbers] = useState(1);
  const [page, setPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(true);
  const [editPassword, setEditPassword] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [rubrics, setRubrics] = useState([]);
  const [openRubricDialog, setOpenRubricDialog] = useState(false);
  const [editRubric, setEditRubric] = useState(null);
  const [selectedRubrik, setSelectedRubrik] = useState(null);

  useEffect(() => {
    fetchPasswords();
    fetchRubrics();
  }, [authed, page, refreshFlag, selectedRubrik]);

  useEffect(() => {
    fetchPasswords();
    fetchRubrics();
  }, [authed, page, refreshFlag]);

  const fetchPasswords = () => {
    getPasswordsPage(authed, page).then((data) => {
      let filteredPasswords = data.passwords;

      // Check if a rubric is selected
      if (selectedRubrik) {
        filteredPasswords = filteredPasswords.filter(
          (password) => password.password.rubricUUID === selectedRubrik.uuid
        );
      }

      setRows(filteredPasswords);
      setPageNumbers(data.totalPages);
    });
  };

  const fetchRubrics = () => {
    getRubriks(authed).then((data) => {
      setRubrics(data);
    });
  };

  const handleUpdatePassword = (passwordId, newRubrikId) => {
    const password = rows.find((row) => row.id === passwordId);
    if (password) {
      setEditPassword(password);
      if (editPassword) {
        handleAddPasswordToRubrik(editPassword, newRubrikId);
      } else {
        console.error("editPassword is not set");
      }
    } else {
      console.error("Password not found");
    }
  };

  const handleRubricSelection = (rubrik) => {
    setSelectedRubrik(rubrik);
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
    setOpenAddDialog(true);
  };

  const handleAddPassword = (newPasswordData) => {
    addPassword(authed, newPasswordData);
    setRefreshFlag((prevFlag) => !prevFlag);
    setOpenAddDialog(false);
  };

  const handleDeleteRubric = async (uuid) => {
    await deleteRubrik(authed, uuid);
    setRefreshFlag((prevFlag) => !prevFlag);
    setEditRubric(null);
    setOpenRubricDialog(false);
  };

  const handleEditRubric = (rubric) => {
    setEditRubric(rubric);
    setOpenRubricDialog(true);
  };

  const handleUpdateRubric = (uuid, newRubrik) => {
    updateRubrik(authed, uuid, newRubrik);
    setRefreshFlag((prevFlag) => !prevFlag);
    setEditRubric(null);
    setOpenRubricDialog(false);
  };

  const handleAddRubric = () => {
    setOpenRubricDialog(true);
  };

  const handleCreateRubric = (rubrik) => {
    createRubrik(authed, rubrik);
    setRefreshFlag((prevFlag) => !prevFlag);
    setOpenRubricDialog(false);
  };

  const handleAddPasswordToRubrik = async (rubricUUID) => {
    if (!rubricUUID) {
      console.error("UUID is null or undefined");
      return;
    }

    if (!editPassword || !editPassword.uuid) {
      console.error("editPassword or editPassword.uuid is null or undefined");
      return;
    }

    await addPasswordToRubrik(authed, rubricUUID, editPassword.uuid);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DrawerComponent open={openDrawer} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <RubricDropdown
                rubrics={rubrics}
                handleEditRubric={handleEditRubric}
                handleAddRubric={handleAddRubric}
                handleRubricSelection={handleRubricSelection}
              />
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid
            container
            spacing={3}
            style={{ display: "flex", flexDirection: "row-reverse" }}
          >
            <Grid item xs={12}>
              <PasswordTable
                rows={rows}
                handleEditPassword={handleEditPassword}
                handleDeletePassword={handleDeletePassword}
              />
            </Grid>
            <PaginationComponent
              pageNumbers={pageNumbers}
              page={page}
              handlePageChange={handlePageChange}
            />
          </Grid>
        </Container>
      </Box>
      <AddButtons
        onClick={() => setOpenAddDialog(true)}
        sx={{ position: "absolute", bottom: "20px", right: "20px" }}
      />
      <PasswordDialog
        open={openAddDialog}
        onClose={() => {
          setOpenAddDialog(false);
          setEditPassword(null);
        }}
        onAddPassword={handleAddPassword}
        editPassword={editPassword}
        onUpdatePassword={handleUpdatePassword}
        rubrics={rubrics} // Pass rubrics to PasswordDialog
        onAddPasswordToRubrik={handleAddPasswordToRubrik} // Pass function to associate password with rubric
      />
      <RubricDialog
        open={openRubricDialog}
        onClose={() => {
          setOpenRubricDialog(false);
          setEditRubric(null);
        }}
        onAddRubric={handleCreateRubric}
        editRubric={editRubric}
        onUpdateRubric={handleUpdateRubric}
        onDeleteRubric={handleDeleteRubric}
      />
    </Box>
  );
}
