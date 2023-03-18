import {auth, db, app} from '../config/firebaseConfig';
import {addDoc, collection, getDoc, doc} from 'firebase/firestore';
import {useNavigation} from 'react-router-dom';

async function createUser(uid) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return;
  }
  const user = auth.currentUser;
  let name = user.displayName;
  if (name == null) {
    name = 'User';
  }
  return await addDoc(collection(db, 'users'), {
    uid,
    email: user.email,
    name: name,
    photoURL: '',
    phoneNumber: '',
  });
}

async function updateUser(uid, data) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return await userRef.update(data);
  }
}

async function getUser(uid) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  }
}

async function deleteUser(uid) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return await userRef.delete();
  }
}

async function checkIfUserExists(uid) {
  const userRef = await doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  console.log('userRef: ', userRef);
  console.log('userSnap: ', userSnap);
  const user = userSnap.data();
  console.log('user: ', user);
  if (user == null) {
    return null;
  } else {
    return await getDoc(userRef);
  }
}

async function logout() {
  await auth.signOut();
}

export {createUser, updateUser, getUser, deleteUser, checkIfUserExists, logout};