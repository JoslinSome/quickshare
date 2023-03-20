import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './HomePage.css';
import {auth} from '../config/firebaseConfig';
import {AuthCheck} from '../components/AuthCheck';

function HomePage() {
  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <AuthCheck>
      <div className="background">
        <div className="home-page">
          <h1>Home Page</h1>
        </div>
      </div>
    </AuthCheck>
  );
}

export default HomePage;
