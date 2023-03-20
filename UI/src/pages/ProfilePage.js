import React, {useState, useEffect} from 'react';
import {auth, storage} from '../config/firebaseConfig';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {getResizedImage} from '../utils/imageUtils';
import './ProfilePage.css';
import {getUser, updateUser} from '../firebaseFunctions/firebaseFunctions';
import {AuthCheck} from '../components/AuthCheck';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log('user: ', user);
        setUser(
          getUserInfo()
            .then(r => console.log('r: ', r))
            .catch(e => console.log('e: ', e)),
        );
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function getUserInfo() {
    const {uid} = auth.currentUser;
    const user = await getUser(uid);
    setUser(user);
  }

  useEffect(() => {
    setUser(
      getUserInfo()
        .then(r => console.log('r: ', r))
        .catch(e => console.log('e: ', e)),
    );
  }, []);

  const handleImageUpload = async e => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const resizedImage = await getResizedImage(file, 400, 400);

    setLoading(true);
    setProgress(0);

    const storageRef = ref(storage, `profile-pictures/${user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, resizedImage);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      error => {
        console.error('Error uploading the image:', error);
        setLoading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await updateUser(user.uid, {photoURL: downloadURL});
        setLoading(false);
        // refresh the page to show the new profile picture
        window.location.reload();
      },
    );
  };

  return (
    <AuthCheck>
      <div className="profile">
        <div className="profile-picture">
          <img
            src={user?.photoURL || 'https://via.placeholder.com/150'}
            alt="Profile"
          />
          {loading && (
            <div className="loading-overlay">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div>{progress.toFixed(0)}%</div>
            </div>
          )}
        </div>
        <label htmlFor="profile-pic-upload" className="profile-pic-upload">
          Change Profile Picture
        </label>
        <input
          type="file"
          id="profile-pic-upload"
          accept="image/*"
          onChange={handleImageUpload}
          style={{display: 'none'}}
        />
        <div className="profile-info">
          <h2>{user?.displayName || 'No Name'}</h2>
          <p>{user?.email}</p>
        </div>
      </div>
    </AuthCheck>
  );
}

export default Profile;
