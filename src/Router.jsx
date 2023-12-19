import { Route, Routes } from "react-router-dom";
import { Login } from '../src/pages/Login';
import { Register } from '../src/pages/Register';
import { Dashboard } from "./pages/Dashboard";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}