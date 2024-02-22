const card = document.querySelector("#card-container");
const lookup = document.querySelector("form");
const holder = document.querySelector("#poke-hold");
const farm = document.querySelector('#poke-farm')

const pokegrabber = async (pokeid) => {
  try {
    const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeid}`);
    if (!request.ok) {
      alert(
        `Pokemon not found. Please try again. Check console log for details.`
      );
    }
    const data = await request.json();
    const pokedict = {
      name:
        data["species"]["name"].charAt(0).toUpperCase() +
        data["species"]["name"].slice(1),
      base_hp: data["stats"][0]["base_stat"],
      base_atk: data["stats"][1]["base_stat"],
      base_def: data["stats"][2]["base_stat"],
      base_s_atk: data["stats"][3]["base_stat"],
      base_s_def: data["stats"][4]["base_stat"],
      base_spd: data["stats"][5]["base_stat"],
      base_exp: data["base_experience"],
      ability: data["abilities"][0]["ability"]["name"],
      sprite_url: data["sprites"]["other"]["official-artwork"]["front_default"],
      id_num: data["id"],
      battle_url: data["sprites"]["front_shiny"],
      element: data["types"][0]["type"]["name"],
    };
    for (idx in pokedict) {
      if (!pokedict[idx]) {
        pokedict[idx] = 0;
      }
    }
    return pokedict;
  } catch (error) {
    console.error(`There was an error: ${error}`);
  }
};

const addpoke = async (poke) => {
  pokemon = await pokegrabber(poke);
  card.innerHTML = `
    <div class="flip-card">
    <div class="flip-card-inner shadow">
      <div class="flip-card-front ${pokemon.element}">
        <img
          src="${pokemon.sprite_url}"
          alt="Avatar"
          style="width: 250px; height: 250px"
          class="front-img"
        />
        <p class="front-text">${pokemon.name}</p>
      </div>
      <div class="flip-card-back ${pokemon.element}-b">
        <h1 class="back-text">${pokemon.name}</h1>
        <p class="id_num">${pokemon.id_num}</p>
        <div class="information">
          <p class="info-text">Base HP: ${pokemon.base_hp}</p>
          <p class="info-text">Base EXP: ${pokemon.base_exp}</p>
          <p class="info-text">
            Base ATK: ${pokemon.base_atk} || Base DEF: ${pokemon.base_def}
          </p>
          <p class="info-text">
            Base S. ATK: ${pokemon.base_s_atk} || Base S. DEF: ${pokemon.base_s_def}
          </p>
          <p class="info-text">Base SPD: ${pokemon.base_spd}</p>
          <p class="info-text">Ability: ${pokemon.ability}</p>
        </div>
        <p class="id_num type">Type: ${pokemon.element}</p>
      </div>
    </div>
  </div>
    `;
    farm.innerHTML = 'Your lil PokeFarm'
  const img = document.createElement("img");
  img.src = pokemon.battle_url;
  holder.append(img)
};

lookup.addEventListener("submit", (event) => {
  event.preventDefault();
  poke = event.target[0].value;
  if (poke > 1025) {
    alert(`Hey now, there's only 1025 pokemon in existence. Get it together.`);
  }
  if (!poke) {
    poke = Math.floor(Math.random() * (1025 - 1) + 1);
  }
  addpoke(poke);
});
