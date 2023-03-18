import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './HomePage.css';
import {auth} from '../config/firebaseConfig';

function AuthCheck({children}) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsSignedIn(true);
      } else {
        navigate('/sign-in');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return <>{isSignedIn && children}</>;
}

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
      <div className="home-page">
        <h1>Home Page</h1>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </AuthCheck>
  );
}

export default HomePage;
