let currentPokemon = null;
let favoritos = [];

function searchPokemon() {
  const nombre = document.getElementById("pokemonInput").value.toLowerCase();
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then(response => {
      if (!response.ok) throw new Error("Pokémon no encontrado");
      return response.json();
    })
    .then(data => {
      currentPokemon = {
        nombre: data.name,
        imagen: data.sprites.front_default
      };

      const card = document.createElement("div");
      card.className = "pokemon-card";

      card.innerHTML = `
        <img src="${currentPokemon.imagen}" alt="${currentPokemon.nombre}">
        <div class="pokemon-name">${currentPokemon.nombre}</div>
      `;

      resultado.appendChild(card);
    })
    .catch(error => {
      resultado.innerHTML = `<p class="text-danger fw-bold">${error.message}</p>`;
      currentPokemon = null;
    });
}

function saveFavorite() {
  if (!currentPokemon) return;

  const yaExiste = favoritos.some(p => p.nombre === currentPokemon.nombre);
  if (!yaExiste) {
    favoritos.push(currentPokemon);
    renderFavorites();
  }
}

function eliminarFavorito(nombre) {
  favoritos = favoritos.filter(p => p.nombre !== nombre);
  renderFavorites();
}

function renderFavorites() {
  const contenedor = document.getElementById("favoritos");
  const texto = document.getElementById("favoritoTexto");
  contenedor.innerHTML = "";

  if (favoritos.length > 0) {
    texto.textContent = "Aquí está tu Pokémon favorito:";
  } else {
    texto.textContent = "";
  }

  favoritos.forEach(pokemon => {
    const card = document.createElement("div");
    card.className = "pokemon-card favorite-card";

    card.innerHTML = `
      <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
      <div class="pokemon-name">${pokemon.nombre}</div>
      <i class="bi bi-heart-fill heart-icon"></i>
      <button class="btn btn-danger position-absolute top-0 end-0 m-2" onclick="eliminarFavorito('${pokemon.nombre}')">
        <i class="bi bi-x"></i>
      </button>
    `;

    contenedor.appendChild(card);
  });
}
