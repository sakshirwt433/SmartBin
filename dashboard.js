import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- 1. FIREBASE CONFIGURATION ---
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

// --- 2. AUTH PROTECTION ---
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "LoginPage.html";
    } else {
        console.log("Dashboard Online");
        startLiveDashboard();
    }
});

// --- 3. LIVE DATA LOGIC ---
function startLiveDashboard() {
    
    // A. Listen to the SUMMARY (Dashboard Collection -> stats document)
    // This updates your colorful cards
    const statsRef = doc(db, "Dashboard", "fDQbuPRLUNOKP0fuqr4N");
    onSnapshot(statsRef, (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            
            updateElement('totalBins', data.totalBins || 0);
            updateElement('filledBins', data.filledBins || 0);
            updateElement('activeAlerts', data.activeAlerts || 0);
            updateElement('collectionsToday', data.pickupsToday || 0);
        }
    });

    // B. Listen to the DETAILS (Bins Collection)
    // This updates your "Live Sensor Alerts" table
    const binsRef = collection(db, "BinsCollection");
    onSnapshot(binsRef, (snapshot) => {
        let alertHTML = "";

        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            console.log("Checking Bin:", docSnap.id, data.level);
            // Show in alert table ONLY if level is high (e.g., > 80%)
            if (data.level >= 80) {
                alertHTML += `
                <tr>
                    <td>${data.binId || '0.00'}</td>
                    <td>${data.type || 'General'}</td>
                    <td>${data.level}%</td>
                    <td><span class="status-pill">Critical</span></td>
                </tr>`;
            }
        });

        const tableBody = document.getElementById('alertsTable');
        if (tableBody) {
            tableBody.innerHTML = alertHTML || "<tr><td colspan='4' style='text-align:center; padding:20px;'>✅ All bins are currently under capacity.</td></tr>";
        }
    });
}

// Helper to update text safely
function updateElement(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
}

// --- 4. LOGOUT ---
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = "LoginPage.html";
    });
});
