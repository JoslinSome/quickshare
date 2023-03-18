import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './SignInPage.css';
import {auth, db} from '../config/firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {GoogleAuthProvider} from 'firebase/auth';
import {signInWithPopup} from 'firebase/auth';
import {
  checkIfUserExists,
  createUser,
} from '../firebaseFunctions/firebaseFunctions';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const signInWithGoogle = async () => {
    // Sign in using a popup.
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    try {
      const result = await signInWithPopup(auth, provider);

      // The signed-in user info.
      const user = result.user;
      console.log(user);
      if ((await checkIfUserExists(user.uid)) === null) {
        await createUser(user.uid, 'google');
      }
      // This gives you a Google Access Token.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="sign-in-page">
      <h1>Sign In Page</h1>
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
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <Link className="sign-up-link" to="/sign-up">
        Create Account
      </Link>
      <Link className="forgot-password-link" to="/forgot-password">
        Forgot Password
      </Link>
    </div>
  );
}

export default SignInPage;
