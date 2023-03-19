import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './SettingsPage.css';
import {auth, db} from '../config/firebaseConfig';
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  sendEmailVerification,
} from 'firebase/auth';
import {doc, updateDoc, getDoc} from 'firebase/firestore';

function SettingsPage(message) {
  const [user, setUser] = useState(auth.currentUser);
  const [userDataSet, setUserDataSet] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log('user.uid: ', user.uid);
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        console.log('userDoc11: ', userDoc.data());
        setName(userDoc.data().name);
        setPhone(userDoc.data().phone);
        setAddress(userDoc.data().address);
        setUserDataSet(true);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails()
      .then(r => console.log('fetchUserDetails() returned: ', r))
      .catch(e => console.error('fetchUserDetails() error: ', e));
  }, [userDataSet]);

  const updateSettings = async message => {
    try {
      if (currentPassword) {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword,
        );
        await reauthenticateWithCredential(user, credential);
      }

      if (newPassword) {
        await user.updatePassword(newPassword);
      }

      if (email !== user.email) {
        await updateEmail(user, email);
        await sendEmailVerification(user);
      }

      await updateDoc(doc(db, 'users', user.uid), {
        name,
        phone,
        address,
      });

      alert('Settings updated successfully');
      navigate('/');
    } catch (error) {
      alert('Error updating settings:', error.message);
    }
  };
  return (
    <div className="background">
      <div className="settings-page">
        <h1>Account Settings</h1>
        {userDataSet ? (
          <div className="settings-input">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        ) : null}
        {userDataSet ? (
          <div className="settings-input">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        ) : null}
        {userDataSet ? (
          <div className="settings-input">
            <label>Phone:</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
        ) : null}
        {userDataSet ? (
          <div className="settings-input">
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
        ) : null}
        {userDataSet ? (
          <div className="settings-input">
            <label>Current Password (if updating password):</label>
            <input
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
          </div>
        ) : null}
        {userDataSet ? (
          <div className="settings-input">
            <label>New Password (optional):</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>
        ) : null}
        {userDataSet ? (
          <button onClick={updateSettings}>Update Settings</button>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default SettingsPage;
