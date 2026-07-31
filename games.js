import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAwdwG9nA5qTpr_3K2AGM270dsITirSf6Q",
  authDomain: "infinity-mart-ccfb9.firebaseapp.com",
  projectId: "infinity-mart-ccfb9",
  storageBucket: "infinity-mart-ccfb9.firebasestorage.app",
  messagingSenderId: "482162648030",
  appId: "1:482162648030:web:3ce3e3f2dea4de146af34f"
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