import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import {firebaseConfig} from './config';

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Use this to initialize the firebase App// Use these for db & auth
const db = getFirestore(app);
const auth = getAuth(app);

const storage = getStorage(app);

export {auth, db, storage, app, analytics};
