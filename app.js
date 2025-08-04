let currentPokemon = null;

function searchPokemon() {
  const name = document.getElementById("pokemonInput").value.trim().toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("No encontrado");
      return response.json();
    })
    .then(data => {
      currentPokemon = {
        name: data.name,
        image: data.sprites.front_default
      };

      const resultadoDiv = document.getElementById("resultado");
      resultadoDiv.innerHTML = `
        <div class="pokemon-card">
          <img src="${currentPokemon.image}" alt="${currentPokemon.name}">
          <div class="pokemon-name">${currentPokemon.name}</div>
        </div>
      `;
    })
    .catch(error => {
      alert("¡Error! Pokémon no encontrado. Verifica que esté bien escrito.");
      currentPokemon = null;
      document.getElementById("resultado").innerHTML = "";
    });
}

function saveFavorite() {
  if (!currentPokemon) {
    alert("Primero busca un Pokémon.");
    return;
  }

  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  const yaExiste = favoritos.some(p => p.name === currentPokemon.name);
  if (!yaExiste) {
    favoritos.push(currentPokemon);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    updateFavoritesList();
  } else {
    alert("¡Este Pokémon ya está en tus favoritos!");
  }
}

function updateFavoritesList() {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const contenedor = document.getElementById("favoritos");
  contenedor.innerHTML = "";

  favoritos.forEach(pokemon => {
    const div = document.createElement("div");
    div.className = "pokemon-card favorite-card";
    div.innerHTML = `
      <img src="${pokemon.image}" alt="${pokemon.name}">
      <div class="pokemon-name">${pokemon.name}</div>
      <div class="heart-icon"><i class="bi bi-heart-fill"></i></div>
      <button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1" onclick="removeFavorite('${pokemon.name}')">❌</button>
    `;
    contenedor.appendChild(div);

    
  });
}
function removeFavorite(name) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos = favoritos.filter(pokemon => pokemon.name !== name);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  updateFavoritesList();
}



window.onload = updateFavoritesList;
