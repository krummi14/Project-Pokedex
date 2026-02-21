let BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
let pokemonsMainList = [];
let contentLoadingScreen = document.getElementById('loading_screen');
let contentPokemonList = document.getElementById('pokemon_list');

function init() {
    showLoadingScreen();
    showPokemonList();
    showPokemonsMainList();
}

async function renderPokemons(start, end) {
    for (let index = start; index < end; index++) {
        let pokemonObj = await getPokemonData(index);
        pokemonsMainList.push(pokemonObj);
    }
    return pokemonsMainList;
}

async function getPokemonData(path = "") {
    let response = await fetch(BASE_URL + path);
    let pokemonResponseAsJson = await response.json();
    return createPokemonsList(pokemonResponseAsJson);
}

function createPokemonsList(pokemonResponseAsJson) {
    return {
        id: pokemonResponseAsJson.id,
        name: pokemonResponseAsJson.name,
        img_url: pokemonResponseAsJson.sprites.other.dream_world.front_default,
        types: {
            1: pokemonResponseAsJson.types[0].type.name,
            2: pokemonResponseAsJson.types[1].type.name
        }
    };
}

async function showPokemonsMainList() {
    pokemonsMainList = await renderPokemons(1, 4);
    console.log(pokemonsMainList);
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
    renderPokemonData(21, 41);
}