const firebaseConfig = {
  apiKey: 'AIzaSyD88WfIcGzw5b9_IsPK1sHUStZNZc5OO1M',
  authDomain: 'social-network-lab1.firebaseapp.com',
  databaseURL: 'https://social-network-lab1.firebaseio.com',
  projectId: 'social-network-lab1',
  storageBucket: 'social-network-lab1.appspot.com',
  messagingSenderId: '393204902059',
  appId: '1:393204902059:web:3ec3540f32d2297b42afee',
  measurementId: 'G-W0GQR66GF0',
};
// Initialize Firebase
// eslint-disable-next-line no-use-before-define
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// const firebase = require("firebase");
// Required for side-effects
// require("firebase/firestore");
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### CLOUD FIRESTORE PROJECT ID ###'
});

const db = firebase.firestore();
