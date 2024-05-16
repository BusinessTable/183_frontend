import * as React from "react";
import SignUp from "./pages/SignUp";
import SingIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SingIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Navigate to="/signin" replace/>} />
    </Routes>
  );
}
