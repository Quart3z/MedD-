console.log('Firebase config called');

// Your web app's Firebase configuration
var firebaseConfig = {
    
    apiKey: "AIzaSyAM-F1wn5MUu4TJXsX_ifIEqD9GudpBPUw",
    authDomain: "medd-795c2.firebaseapp.com",
    databaseURL: "https://medd-795c2.firebaseio.com",
    projectId: "medd-795c2",
    storageBucket: "medd-795c2.appspot.com",
    messagingSenderId: "209826757058",
    appId: "1:209826757058:web:0fdfc360344c781b10fe5b",
    measurementId: "G-H5RFC9SPD6"
    
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

console.log('initialized app');