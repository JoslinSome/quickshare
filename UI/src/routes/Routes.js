import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import WelcomePage from '../pages/WelcomePage';
import SellPage from '../pages/SellPage';
import Navbar from '../components/NavBar';
import HomePage from '../pages/HomePage';

function RoutesNavigation() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default RoutesNavigation;
