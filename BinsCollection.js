import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// --- 1. FIREBASE CONFIG ---
const firebaseConfig = {
    apiKey: "AIzaSyBL_TNQJBa2JwYiwAg4iGkEa4G21Hj_7N0",
    authDomain: "smartbin-a5342.firebaseapp.com",
    projectId: "smartbin-a5342",
    storageBucket: "smartbin-a5342.firebasestorage.app",
    messagingSenderId: "914066227902",
    appId: "1:914066227902:web:12b45376c55abcd276d4ef"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// --- 2. AUTH PROTECTION ---
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "LoginPage.html";
    } else {
        loadBinsTable();
    }
});

// --- 3. LOAD BINS TABLE ---
function loadBinsTable() {
    const binsRef = collection(db, "BinsCollection");

    onSnapshot(binsRef, (snapshot) => {
        const tableBody = document.getElementById('binsTable');
        if (!tableBody) return; // Safety check
        
        let html = "";

        snapshot.forEach((doc) => {
            const data = doc.data();
            const level = data.level || 0;
            const status = data.status || "active"; 
            
            // Dynamic styling for status and level
            const statusClass = status === 'active' ? 'status-ok' : 'status-full';
            const levelStyle = level >= 80 ? 'color: #ef4444; font-weight: bold;' : 'color: #10b981;';

            html += `
                <tr>
                    <td>${data.binId || '0.00'}</td>
                    <td>${data.location || 'N/A'}</td>
                    <td>${data.latitude || '0.00'}</td>
                    <td>${data.longitude || '0.00'}</td>
                    <td>${data.type || 'Organic'}</td>
                    <td style="${levelStyle}">${level}%</td>
                    <td><span class="${statusClass}">${status.toUpperCase()}</span></td>
                </tr>
            `;
        });

        tableBody.innerHTML = html || "<tr><td colspan='8'>No bins registered yet.</td></tr>";
    });
}

// --- 4. LOGOUT LOGIC ---
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            window.location.href = "LoginPage.html";
        }).catch((error) => {
            console.error("Logout Error:", error);
        });
    });
}
