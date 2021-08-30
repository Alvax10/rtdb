import firebase from "firebase";

const app = firebase.initializeApp({
    apiKey: 'mKsEaIjDWkxlBBrsCZoFVbZtQsnLzCYYKWHu2I5x',
    authDomain: 'apx-dwf-m6.firebaseapp.com',
    databaseURl: 'https://apx-dwf-m6-fbrt-default-rtdb.firebaseio.com',
    projectId: 'apx-dwf-m6',
});

const rtdb = firebase.database();

export { rtdb };