import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import WelcomePage from '../pages/WelcomePage';
import SellPage from '../pages/SellPage';
import Navbar from '../components/NavBar';
import HomePage from '../pages/HomePage';
import SettingsPage from '../pages/SettingsPage';
import RentPage from '../pages/RentPage';
import MessagingPage from '../pages/MessagingPage';
import ProfilePage from '../pages/ProfilePage';

function RoutesNavigation() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/share" element={<SellPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/account-settings" element={<SettingsPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="messages" element={<MessagingPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="sell" element={<SellPage />} />
      </Routes>
    </Router>
  );
}

export default RoutesNavigation;
