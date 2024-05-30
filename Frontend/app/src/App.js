import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import UserPage from './Components/UserPage'
import AdminPage from './Components/AdminPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userPage" element={<UserPage />} />
        <Route path="/adminPage" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
