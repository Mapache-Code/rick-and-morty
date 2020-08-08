const container = document.querySelector(".container");
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const contador = document.querySelector(".contador");
let cantidad = 1;

async function getCharacters(cantidad) {
  let url = `https://rickandmortyapi.com/api/character/?page=${cantidad}`;
  try {
    let response = await fetch(url);
    console.log(response.status);
    console.log(response.statusText);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderCharacters(cantidad) {
  let characters = await getCharacters(cantidad);
  console.log(characters);
  contador.innerHTML = `${cantidad} / 30`;
  container.innerHTML = "";
  characters.results.map((character) => {
    container.innerHTML += `
      <div class="item">
        <img src="${character.image}" >
        <div class="item--detail">
          <h2>${character.name}</h2>
          <p>
            <span class="item--text__bold">Estado: </span>${character.status}
          </p>
          <p>
            <span class="item--text__bold">Género: </span>${character.gender}
          </p>
          <p>
            <span class="item--text__bold">Especie: </span>${character.species}
          </p>
          <p>
            <span class="item--text__bold">Tipo: </span>${character.type}
          </p>
          <p>
            <span class="item--text__bold">Origen: </span>${character.origin.name}
          </p>
          <p>
            <span class="item--text__bold">Última vez visto: </span>${character.location.name}
          </p>
        </div>
      </div>
    `;
  });
}

next.addEventListener("click", function () {
  if (cantidad < 30) {
    cantidad++;
    renderCharacters(cantidad);
  }
});

previous.addEventListener("click", function () {
  if (cantidad > 1) {
    cantidad--;
    renderCharacters(cantidad);
  }
});

renderCharacters(cantidad);
