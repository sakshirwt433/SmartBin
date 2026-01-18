import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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

let map; 
let markers = {};

// 1. Initialize Map
window.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('map')) return;

    // Center on Dehradun coords you provided
    map = L.map('map').setView([30.3384, 77.9667], 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // 2. Handle Auth and Data
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "LoginPage.html";
        } else {
            loadMapData();
        }
    });
});

function loadMapData() {
    // FIX: Changed "bins" to "BinsCollection" to match your DB
    onSnapshot(collection(db, "BinsCollection"), (snapshot) => {
        snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            
            // Ensure Latitude and Longitude exist in your Firebase fields
            const lat = parseFloat(data.latitude);
            const lng = parseFloat(data.longitude);
            const level = data.level || 0;

            if (!isNaN(lat) && !isNaN(lng)) {
                // Determine color based on fill level
                let color = level >= 80 ? '#ef4444' : level >= 50 ? '#f59e0b' : '#10b981';
                
                // Remove old marker if it exists to prevent duplicates
                if (markers[id]) {
                    map.removeLayer(markers[id]);
                }

                // Add Circle Marker
                markers[id] = L.circleMarker([lat, lng], {
                    radius: 12,
                    fillColor: color,
                    color: "#fff",
                    weight: 3,
                    opacity: 1,
                    fillOpacity: 0.9
                }).addTo(map);

                markers[id].bindPopup(`
                    <div style="color: #333; font-family: sans-serif; min-width: 150px;">
                        <b style="font-size: 14px;">🗑️ Bin: ${id.substring(0,6)}</b><br>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 5px 0;">
                        Level: <b style="color: ${color}">${level}%</b><br>
                        Status: <b>${(data.status || 'Active').toUpperCase()}</b><br>
                        Type: ${data.type || 'General'}
                    </div>
                `);
            }
        });
    });
}

// Logout Logic
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    signOut(auth).then(() => window.location.href = "LoginPage.html");
});
