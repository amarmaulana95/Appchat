import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBXAnx9yHHpDp4eBlvLwiT8Dxsql2UEmPk",
    authDomain: "reactchat-ffd94.firebaseapp.com",
    databaseURL: "https://reactchat-ffd94.firebaseio.com",
    projectId: "reactchat-ffd94",
    storageBucket: "reactchat-ffd94.appspot.com",
    messagingSenderId: "742388013458",
    appId: "1:742388013458:web:ae3db58692ee91732e494b",
    measurementId: "G-9X3QXQE001"
};
const Database = firebase.initializeApp(firebaseConfig);

export default Database;