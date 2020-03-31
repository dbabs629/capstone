 
import firebase from 'firebase/app';
//incorporating firebase storage
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA9Uos2N592b4lZZPnj7ONTCpH6zBcUtNg",
    authDomain: "we-explore-capstone.firebaseapp.com",
    databaseURL: "https://we-explore-capstone.firebaseio.com",
    projectId: "we-explore-capstone",
    storageBucket: "we-explore-capstone.appspot.com",
    messagingSenderId: "600499606674",
    appId: "1:600499606674:web:25808dba79cac0cd8d024b"
}

firebase.initializeApp(firebaseConfig);

 

export default firebase; 