let currentPokemon = null;

function searchPokemon() {
  const name = document.getElementById("pokemonInput").value.toLowerCase();
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
        <h3>${currentPokemon.name}</h3>
        <img src="${currentPokemon.image}" alt="${currentPokemon.name}">
      `;
    })
    .catch(error => {
      alert("¡Error! Pokémon no encontrado");
      currentPokemon = null;
      document.getElementById("resultado").innerHTML = "";
    });
}

function saveFavorite() {
  if (!currentPokemon) {
    alert("Busca un Pokémon primero.");
    return;
  }

  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  const yaExiste = favoritos.some(p => p.name === currentPokemon.name);
  if (!yaExiste) {
    favoritos.push(currentPokemon);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    updateFavoritesList();
  } else {
    alert("¡Ya está en favoritos!");
  }
}

function updateFavoritesList() {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const contenedor = document.getElementById("favoritos");
  contenedor.innerHTML = "";

  favoritos.forEach(pokemon => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${pokemon.name}</strong><br>
      <img src="${pokemon.image}" alt="${pokemon.name}">
    `;
    contenedor.appendChild(div);
  });
}
window.onload = updateFavoritesList;