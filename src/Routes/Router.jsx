import { Route, Routes } from "react-router-dom";
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from "../pages/Dashboard";

import { Private } from "./Private";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
    </Routes>
  )
}