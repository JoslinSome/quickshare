import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import './SignUpPage.css';
import {auth, db, app} from '../config/firebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {GoogleAuthProvider} from 'firebase/auth';
function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signUpWithEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="sign-up-page">
      <h1>Sign Up Page</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={signUpWithEmail}>Sign Up with Email</button>
      <button onClick={signUpWithGoogle}>Sign Up with Google</button>
      <Link className="sign-in-link" to="/sign-in">
        Already have an account? Sign In
      </Link>
    </div>
  );
}

export default SignUpPage;
