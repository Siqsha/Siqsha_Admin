import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD3RCPlKWZX-TR6X2QO5oRPuxZk3U7fQvE",
    authDomain: "siqsha-af94b.firebaseapp.com",
    projectId: "siqsha-af94b",
    storageBucket: "siqsha-af94b.appspot.com",
    messagingSenderId: "235433138603",
    appId: "1:235433138603:web:dc57c7d76e04f8a75e1aee"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
