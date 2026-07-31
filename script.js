import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
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


// Latest Notice
async function loadNotice() {

  const banner = document.getElementById("noticeBanner");

  if (!banner) return;

  try {

    const snap = await getDoc(doc(db, "website", "notice"));

    if (snap.exists()) {

      banner.innerText = "📢 " + snap.data().message;

    } else {

      banner.innerText = "📢 Welcome to VexGamerBD";

    }

  } catch (e) {

    banner.innerText = "📢 Welcome to VexGamerBD";
    console.log(e);

  }

}



// Latest Games
async function loadGames() {

  const container = document.getElementById("gamesContainer");

  if (!container) return;


  container.innerHTML = "";


  try {

    const snapshot = await getDocs(collection(db, "games"));


    if (snapshot.empty) {

      container.innerHTML = "<h3>No Games Available</h3>";
      return;

    }


    snapshot.forEach((docSnap) => {


      const game = docSnap.data();


      container.innerHTML += `

        <div class="game-card">

          <img src="${game.image}" alt="${game.name}">


          <h2>${game.name}</h2>

          <p>Version: ${game.version}</p>

          <p>Size: ${game.size}</p>


          <button onclick="location.href='download.html?id=${docSnap.id}'">

            📥 Download

          </button>


        </div>

      `;


    });


  } catch (e) {

    console.log(e);

    container.innerHTML = "<h3>Failed to load games</h3>";

  }

}



loadNotice();