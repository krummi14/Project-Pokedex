let BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
let SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species/'
let pokemonsMainList = [];
let contentLoadingScreen = document.getElementById('loading_screen');
let contentPokemonList = document.getElementById('pokemon_list');
let contentPokemonCard = document.getElementById('pokemon_card_list');


function init() {
    showLoadingScreen();
    showPokemonList();
    initPokemon();
}

async function initPokemon() {
    await renderPokemonsMainList(1, 21);
    renderPokemonCard();
}

async function getPokemonData(id = "") {
    let pokemonResponse = await fetch(BASE_URL + id);
    let pokemonResponseAsJson = await pokemonResponse.json();
    let speciesResponse = await fetch(SPECIES_URL + id);
    let pokemonSpeciesResponseAsJson = await speciesResponse.json();
    return createPokemonsMainList(pokemonResponseAsJson, pokemonSpeciesResponseAsJson);
}

function createPokemonsMainList(pokemonResponseAsJson, pokemonSpeciesResponseAsJson) {
    return {
        id: pokemonResponseAsJson.id,
        name: pokemonResponseAsJson.name,
        img_url: pokemonResponseAsJson.sprites.other.dream_world.front_default,
        types: pokemonResponseAsJson.types.map(typeElement => {
            return typeElement.type.name
        }),
        color: pokemonSpeciesResponseAsJson.color.name
    };
}

async function renderPokemonsMainList(start, end) {
    for (let index = start; index < end; index++) {
        let pokemonObj = await getPokemonData(index);
        pokemonsMainList.push(pokemonObj);
    }
    return pokemonsMainList;
}

function renderPokemonCard() {
    contentPokemonCard.innerHTML = "";
    for (let pokemonCardIndex = 0; pokemonCardIndex < pokemonsMainList.length; pokemonCardIndex++) {
        contentPokemonCard.innerHTML += getPokemonCardTemplate(pokemonCardIndex);
        checkColor(pokemonCardIndex);
    }
}

function checkColor(pokemonCardIndex) {
    let contentPokemonCardId = document.getElementById(`pokemon_id_${pokemonCardIndex}`);
    let contentPokemonCardName = document.getElementById(`pokemon_name_${pokemonCardIndex}`);
    let contentPokemonCardType = document.getElementById(`pokemon_types_${pokemonCardIndex}`)
        if (pokemonsMainList[pokemonCardIndex].color == 'white' || pokemonsMainList[pokemonCardIndex].color == 'yellow') {
            contentPokemonCardId.style = 'color: rgba(158, 156, 156, 1)';
            contentPokemonCardName.style = 'color: rgba(158, 156, 156, 1)';
            contentPokemonCardType.style = 'color: rgba(158, 156, 156, 1)';
        }
}





function showLoadingScreen() {
    contentLoadingScreen.classList.remove('loading_screen_none');
    setTimeout(() => {
        contentLoadingScreen.classList.add('loading_screen_none');
    }, 5000);
}

function showPokemonList() {
    setTimeout(() => {
        contentPokemonList.classList.remove('pokemon_list_none');
    }, 5000);
}

function loadMorePokemons() {
    showLoadingScreen();
    //renderPokemonsMainList(21, 41);
}