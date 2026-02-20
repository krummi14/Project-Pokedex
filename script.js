let BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
let contentLoadingScreen = document.getElementById('loading_screen');
let contentPokemonList = document.getElementById('pokemon_list');

function init() {
    showLoadingScreen();
    renderPokemonData(1, 2);
    showPokemonList()
}

async function fetchPokemonData(path = "", id = "") {
    let response = await fetch(BASE_URL + path + id);
    let responseAsJson = await response.json();
    console.log(responseAsJson);
}

function renderPokemonData(start, end) {
    for (let index = start; index < end; index++) {
        fetchPokemonData(index);
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
    renderPokemonData(21, 41);
}