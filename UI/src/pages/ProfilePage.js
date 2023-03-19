import React, {useState, useEffect} from 'react';
import {auth, db, storage} from '../config/firebaseConfig';
import {getDoc, doc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import './ProfilePage.css';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUser(userSnap.data());
      }
    };
    fetchUserData().then(r => console.log('r: ', r));
  }, []);

  const resizeImage = file => {
    // Resize the image to 150x150
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const elem = document.createElement('canvas');
          elem.width = 150;
          elem.height = 150;
          const ctx = elem.getContext('2d');
          // img.width and img.height will contain the original dimensions
          ctx.drawImage(img, 0, 0, 150, 150);
          ctx.canvas.toBlob(
            blob => {
              resolve(blob);
            },
            'image/jpeg',
            1,
          );
        };
        reader.onerror = error => reject(error);
      };
    });
  };

  const handleProfilePicUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;

    // Resize the image
    const resizedImage = await resizeImage(file);
    const storageRef = ref(storage, `profilePics/${auth.currentUser.uid}`);
    await uploadBytes(storageRef, resizedImage);
    const url = await getDownloadURL(storageRef);
    setProfilePic(url);
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="profile-pic-container">
        <img
          src={
            profilePic || user?.photoURL || 'https://via.placeholder.com/150'
          }
          alt="Profile"
          className="profile-pic"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicUpload}
          className="profile-pic-upload"
        />
      </div>
      <div className="profile-info">
        <h2>{user?.name}</h2>
        <p>Email: {user?.email}</p>
        <p>Phone: {user?.phoneNumber}</p>
        <p>Address: {user?.address}</p>
        {/* Add other relevant information here */}
      </div>
    </div>
  );
}

export default ProfilePage;
