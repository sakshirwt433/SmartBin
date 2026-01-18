import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyBL_TNQJBa2JwYiwAg4iGkEa4G21Hj_7N0",
  authDomain: "smartbin-a5342.firebaseapp.com",
  projectId: "smartbin-a5342",
  storageBucket: "smartbin-a5342.firebasestorage.app",
  messagingSenderId: "914066227902",
  appId: "1:914066227902:web:12b45376c55abcd276d4ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- LOGIN FUNCTION ---
const loginUser = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const msg = document.getElementById('msg');

  // Basic validation
  if (!email || !password) {
    msg.innerText = "Please fill in all fields.";
    return;
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    msg.style.color = "lightgreen";
    msg.innerText = "Login Successful! Redirecting...";
    
    console.log("Logged in user:", result.user);

    // Redirect to dashboard after success
    setTimeout(() => {
      window.location.href = "dashboard.html"; 
    }, 1500);

  } catch (error) {
    console.error("Login Error:", error.code);
    msg.style.color = "yellow";
    
    // Friendly error messages
    if (error.code === 'auth/invalid-credential') {
      msg.innerText = "Invalid email or password.";
    } else {
      msg.innerText = "Error: " + error.message;
    }
  }
};

// --- EVENT LISTENERS ---

// 1. Handle the Login Button
document.getElementById('loginBtn').addEventListener('click', loginUser);

// 2. Handle the "New User? Sign UP" link
document.getElementById('toggleSignUp').addEventListener('click', () => {
  // Replace 'signup.html' with the actual name of your signup page file
  window.location.href = "signup.html"; 
});
