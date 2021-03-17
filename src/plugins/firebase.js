import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCaEQgrn8LE5yVwcx0bOd90U7OxHOyQnP0',
  authDomain: 'netflix-clone2-ca7ba.firebaseapp.com',
  projectId: 'netflix-clone2-ca7ba',
  storageBucket: 'netflix-clone2-ca7ba.appspot.com',
  messagingSenderId: '8394462206',
  appId: '1:8394462206:web:8bcdb20ad67e7a8e21e6af',
  databaseURL: 'https://netflix-clone2-ca7ba-default-rtdb.firebaseio.com/',
};

firebase.initializeApp(firebaseConfig);
