import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import './SignUpPage.css';
import {auth, db, app} from '../config/firebaseConfig';
import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {GoogleAuthProvider} from 'firebase/auth';
import {
  checkIfUserExists,
  createUser,
} from '../firebaseFunctions/firebaseFunctions';
function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signUpWithEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if ((await checkIfUserExists(user.uid)) == null) {
        await createUser(user.uid);
      }
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const signUpWithGoogle = async () => {
    // Sign in using a popup.
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    try {
      const result = await signInWithPopup(auth, provider);

      // The signed-in user info.
      const user = result.user;
      console.log(user);
      if ((await checkIfUserExists(user.uid)) == null) {
        await createUser(user.uid);
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
