import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './authentic/Login';
import Register from './authentic/Register';
import ForgotPassword from './authentic/ForgotPassword';
import DashboardWrapper from './authentic/DashboardWrapper';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Dashboard" element={<DashboardWrapper />} />
        {/* Aqui pode adicionar mais rotas depois */}
      </Routes>
    </BrowserRouter>
  );
}
