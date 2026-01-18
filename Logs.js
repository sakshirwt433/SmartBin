import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "LoginPage.html";
    } else {
        loadLogs();
    }
});

function loadLogs() {
    const logsRef = collection(db, "Logs"); // Matches your database name
    const q = query(logsRef, orderBy("timestamp", "desc"));

    onSnapshot(q, (snapshot) => {
        const tableBody = document.getElementById('logsTableBody');
        if (!tableBody) return; // Safety check

        let html = "";

        snapshot.forEach((doc) => {
            const data = doc.data(); // This defines 'data' correctly
            const action = data.action || "Update";
            
            // Logic for visual tags
            let tagClass = "tag-update";
            if(action.toLowerCase().includes("collect")) tagClass = "tag-collected";
            if(action.toLowerCase().includes("alert") || action.toLowerCase().includes("full")) tagClass = "tag-alert";

            // Format Timestamp safely
            const dateStr = data.timestamp && typeof data.timestamp.toDate === 'function' 
                         ? data.timestamp.toDate().toLocaleString() 
                         : "N/A";

            html += `
                <tr>
                    <td>${doc.id.substring(0, 6)}...</td>
                    <td>${data.binId || 'N/A'}</td>
                    <td><span class="tag ${tagClass}">${action}</span></td>
                    <td>${data.details || data.notes || 'No details'}</td>
                    <td>${dateStr}</td>
                </tr>
            `;
        });

        tableBody.innerHTML = html || "<tr><td colspan='5'>No logs recorded yet.</td></tr>";
    });
}

document.getElementById('logoutBtn')?.addEventListener('click', () => {
    signOut(auth).then(() => window.location.href = "LoginPage.html");
});
