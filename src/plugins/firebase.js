import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAOcl8DPqS62FxwkyJiwzMSdjH96Ew2_7U',
  authDomain: 'netflix-clone2-c35ba.firebaseapp.com',
  projectId: 'netflix-clone2-c35ba',
  storageBucket: 'netflix-clone2-c35ba.appspot.com',
  messagingSenderId: '698565534262',
  appId: '1:698565534262:web:87dfe7969eb0c075202e97',
  databaseURL: 'https://netflix-clone2-c35ba-default-rtdb.firebaseio.com/',
};

firebase.initializeApp(firebaseConfig);
