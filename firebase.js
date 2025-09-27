
<script type="module">

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


  const firebaseConfig = {
    apiKey:  "AIzaSyBG_OdY7mGWXSBU_CTmHIflWDq9DCY4s7g",
    authDomain: "smartbin-87ea8.firebaseapp.com",
    projectId: "smartbin-87ea8",
    storageBucket: "smartbin-87ea8.firebasestorage.app",
    messagingSenderId: "189248275372",
    appId: "1:189248275372:web:3d3f5d5b9ea9de8e677009"
  };
  
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
</script>
