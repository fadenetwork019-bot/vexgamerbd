import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3RgKEoYuaRoySgzM7eCEN9ArFsiSepX0",
  authDomain: "infinity-mart-28000.firebaseapp.com",
  projectId: "infinity-mart-28000",
  storageBucket: "infinity-mart-28000.firebasestorage.app",
  messagingSenderId: "64222307926",
  appId: "1:64222307926:web:f5c22c05f48fffda24fdf7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");

if (!gameId) {
  document.body.innerHTML = "<h2>Game Not Found!</h2>";
} else {
  loadGame(gameId);
}

async function loadGame(id) {

  const snap = await getDoc(doc(db, "games", id));

  if (!snap.exists()) {
    document.body.innerHTML = "<h2>Game Not Found!</h2>";
    return;
  }

  const game = snap.data();

  document.getElementById("gameImage").src = game.image;
  document.getElementById("gameName").textContent = game.name;
  document.getElementById("gameVersion").textContent = "Version: " + game.version;
  document.getElementById("gameAndroid").textContent = "Android: " + game.android;
  document.getElementById("gameSize").textContent = "Size: " + game.size;
  document.getElementById("gameDescription").textContent = game.description;
  document.getElementById("downloadBtn").onclick = () => {
    window.location.href = "https://google.com";
};

  document.getElementById("downloadBtn").onclick = function () {

    const userCode = prompt("Enter Download Code");

    if (!userCode) return;

    if (userCode.trim() === game.code.trim()) {

      // শুধু link open করবে
      window.location.href = game.download;

    } else {

      alert("❌ Wrong Download Code");

    }

  };

}
