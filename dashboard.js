
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey:  "AIzaSyBG_OdY7mGWXSBU_CTmHIflWDq9DCY4s7g",
    authDomain: "smartbin-87ea8.firebaseapp.com",
    projectId: "smartbin-87ea8",
    storageBucket: "smartbin-87ea8.firebasestorage.app",
    messagingSenderId: "189248275372",
    appId: "1:189248275372:web:3d3f5d5b9ea9de8e677009"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        
        console.log("User is logged in:", user.email);
    } else {
        
        console.log("No user logged in. Redirecting...");
        window.location.href = 'login.html'; 
    }
});


const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout error:", error);
    }
});
