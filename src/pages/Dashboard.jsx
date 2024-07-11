import React, { useState, useEffect } from 'react';
import { CssBaseline, Box, Toolbar, Container, Grid } from '@mui/material';
import DrawerComponent from '../components/DrawerComponent';
import PasswordTable from '../components/PasswordTable';
import PaginationComponent from '../components/PaginationComponent';
import AddButtons from '../components/AddButtons';
import AddPasswordDialog from '../components/PasswordDialog';
import RubricDialog from '../components/RubricDialog';
import RubricDropdown from '../components/RubricDropdown';
import {
  getPasswordsPage,
  deletePassword,
  updatePassword,
  addPassword,
  getRubriks,
  createRubrik,
  deleteRubrik,
  updateRubrik,
} from '../functions/passwordHandler';
import useAuth from '../hooks/useAuth';

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

  useEffect(() => {
    fetchPasswords();
    fetchRubrics();
  }, [authed, page, refreshFlag]);

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
    setOpenAddDialog(true);
  };

  const handleUpdatePassword = (updatedPasswordData) => {
    updatePassword(authed, editPassword.uuid, updatedPasswordData);
    setEditPassword(null);
    setRefreshFlag((prevFlag) => !prevFlag);
    setOpenAddDialog(false);
  };

  const handleAddPassword = (newPasswordData) => {
    addPassword(authed, newPasswordData);
    setRefreshFlag((prevFlag) => !prevFlag);
    setOpenAddDialog(false);
  };

  const handleDeleteRubric = async (uuid) => {
    await deleteRubrik(authed, uuid);
    setRefreshFlag((prevFlag) => !prevFlag);
    setOpenRubricDialog(false);
  };

  const handleEditRubric = (rubric) => {
    setEditRubric(rubric);
    setOpenRubricDialog(true);
  };

  const handleUpdateRubric = (uuid, newRubrik) => {
    updateRubrik(authed, uuid, newRubrik);
    setRefreshFlag((prevFlag) => !prevFlag);
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

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DrawerComponent open={openDrawer} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
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
              />
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid
            container
            spacing={3}
            style={{ display: 'flex', flexDirection: 'row-reverse' }}
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
        sx={{ position: 'absolute', bottom: '20px', right: '20px' }}
      />
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
      <RubricDialog
        open={openRubricDialog}
        onClose={() => setOpenRubricDialog(false)}
        onAddRubric={handleCreateRubric}
        editRubric={editRubric}
        onUpdateRubric={handleUpdateRubric}
        onDeleteRubric={handleDeleteRubric}
      />
    </Box>
  );
}
