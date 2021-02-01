import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCPKAs4Ob_boFuaa8WBaCiNppxeSpnH-5c',
  authDomain: 'netflix-clone-a9a7d.firebaseapp.com',
  projectId: 'netflix-clone-a9a7d',
  storageBucket: 'netflix-clone-a9a7d.appspot.com',
  messagingSenderId: '233379024113',
  appId: '1:233379024113:web:0609de70dc47de183bad50',
  databaseURL:
    'https://netflix-clone-a9a7d-default-rtdb.europe-west1.firebasedatabase.app/',
};

firebase.initializeApp(firebaseConfig);
