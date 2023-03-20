import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {auth} from '../config/firebaseConfig';

export function AuthCheck({children}) {
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
