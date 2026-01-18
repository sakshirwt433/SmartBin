import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBL_TNQJBa2JwYiwAg4iGkEa4G21Hj_7N0",
  authDomain: "smartbin-a5342.firebaseapp.com",
  projectId: "smartbin-a5342",
  storageBucket: "smartbin-a5342.firebasestorage.app",
  messagingSenderId: "914066227902",
  appId: "1:914066227902:web:12b45376c55abcd276d4ef"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Use a standard function (it doesn't need to be on 'window' if we use addEventListener)
const signUp = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const msg = document.getElementById('msg');
  
  console.log("Attempting sign up with:", email);

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    alert("You are signed up!");
    console.log(result.user);
    msg.innerText = "Successfully registered!";
  } catch (error) {
    console.error("Error code:", error.code);
    alert(error.message);
    msg.innerText = error.message;
  }
};

// IMPORTANT: This must be OUTSIDE the function to work
document.getElementById('loginBtn').addEventListener('click', signUp);
