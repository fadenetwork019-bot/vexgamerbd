import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
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

let allGames = [];

async function loadGames() {

  const container = document.getElementById("gamesContainer");
  container.innerHTML = "Loading Games...";

  allGames = [];
console.time("Load Games");
console.timeEnd("Load Games");
  const snapshot = await getDocs(collection(db, "games"));

  if (snapshot.empty) {
    container.innerHTML = "<h3>No Games Available</h3>";
    return;
  }

  snapshot.forEach((docSnap) => {

    const game = docSnap.data();

    allGames.push({
      id: docSnap.id,
      ...game
    });

  });

  displayGames(allGames);

}

function displayGames(games){

  const container = document.getElementById("gamesContainer");

  container.innerHTML = "";

  games.forEach((game)=>{

    container.innerHTML += `
      <div class="game-card">

        <img src="${game.image}" alt="${game.name}">

        <h2>${game.name}</h2>

        <p><b>Version:</b> ${game.version}</p>

        <p><b>Android:</b> ${game.android}</p>

        <p><b>Size:</b> ${game.size}</p>

        <button onclick="location.href='download.html?id=${game.id}'">
          📥 Download
        </button>

      </div>
    `;

  });

}

const search = document.getElementById("search");

if(search){

  search.addEventListener("input",()=>{

    const keyword = search.value.toLowerCase().trim();

  const filtered = allGames.filter(game => {

  const text = `
    ${game.name || ""}
    ${game.description || ""}
    ${game.category || ""}
  `.toLowerCase();

  return text.includes(keyword);

});

    displayGames(filtered);

  });

}

loadGames();
