// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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


const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    const email = emailInput.value;
    const password = passwordInput.value;
    errorMessage.textContent = ''; // Clear previous errors

    try {
        // Use Firebase Auth to sign in the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        console.log("User successfully logged in:", userCredential.user.email);
        
        // Success: Redirect to the dashboard
        window.location.href = 'dashboard.html'; 

    } catch (error) {
        // Failure: Display error message
        console.error("Login failed:", error.message);
        let message = "Login failed. Please check your email and password.";
        
        // Display more specific Firebase error codes
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
             message = "Invalid email or password.";
        }
        
        errorMessage.textContent = message;
    }
});
