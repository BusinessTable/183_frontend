import * as React from 'react';
import SignUp from './pages/SignUp';
import SingIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import useAuth from './hooks/useAuth';

function RequireAuth({ children }) {
  const { authed } = useAuth();
  const location = useLocation();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/signin" replace state={{ path: location.pathname }} />
  );
}

export default function App() {
  React.useEffect(() => {});
  return (
    <Routes>
      <Route path="/signin" element={<SingIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route path="/" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}
