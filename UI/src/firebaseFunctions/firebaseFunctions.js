import {auth, db, app} from '../config/firebaseConfig';
import {addDoc, collection, getDoc, doc, setDoc} from 'firebase/firestore';
import {serverTimestamp} from 'firebase/firestore';

// ... other imports
import {v4 as uuidv4} from 'uuid';

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
  return await setDoc(doc(db, 'users', uid), {
    uid,
    email: user.email,
    name: name,
    photoURL: '',
    phoneNumber: 'Unknown',
    address: 'Unknown',
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
  console.log('userRef: ', userRef);
  const userSnap = await getDoc(userRef);
  console.log('userSnap: ', userSnap.data());
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return null;
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

// ... other functions

async function addExampleChats() {
  console.log('Adding example chats...');
  const currentUser = auth.currentUser;
  const userIds = ['user1', 'user2', 'user3', 'user4', 'user5'];
  const userNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

  for (let i = 0; i < userIds.length; i++) {
    // Create a chat document
    const userId = userIds[i];
    const chatRef = await addDoc(collection(db, 'privateChats'), {
      members: {
        [currentUser.uid]: {
          name: currentUser.displayName,
        },
        [userIds[i]]: {
          name: userNames[i],
        },
      },
    });
    console.log('ChatRef: ', chatRef);

    console.log('Added example chat with ', userNames[i]);
    // Add example messages
    const messages = [
      {
        content: `Hello, ${userNames[i]}!`,
        timestamp: serverTimestamp(),
        sender: currentUser.uid,
        recipient: userIds[i],
      },
      {
        content: `Hi, ${currentUser.displayName}!`,
        timestamp: serverTimestamp(),
        sender: userIds[i],
        recipient: currentUser.uid,
      },
    ];

    for (const message of messages) {
      await setDoc(
        doc(db, 'privateChats', chatRef.id, 'messages', uuidv4()),
        message,
      );
      console.log('Added example chat message: ', message);
    }
    console.log('Added example chat messages with ', userNames[i]);
  }
}

// ... exports

export {
  createUser,
  updateUser,
  getUser,
  deleteUser,
  checkIfUserExists,
  logout,
  addExampleChats,
};
