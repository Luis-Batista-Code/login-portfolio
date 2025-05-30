import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../src/authentic/Login';
import Register from '../src/authentic/Register';
import DashboardWrapper from '../src/authentic/DashboardWrapper';

const App: React.FC = () => {
  return (
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<DashboardWrapper />} />
  </Routes>
</BrowserRouter>
  );
};

export default App;
