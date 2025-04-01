const firebaseConfig = {
    apiKey: "AIzaSyAFOUcTPdF_jUvUYBrzTx7GkHtOYrj2PPI",
    authDomain: "real-time-chat-fa2e5.firebaseapp.com",
    projectId: "real-time-chat-fa2e5",
    storageBucket: "real-time-chat-fa2e5.firebasestorage.app",
    messagingSenderId: "228595819251",
    appId: "1:228595819251:web:67d1b5d838d67d36934d86"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();