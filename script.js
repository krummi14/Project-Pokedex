let BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
let pokemonsMainList = [];
let contentLoadingScreen = document.getElementById('loading_screen');
let contentPokemonList = document.getElementById('pokemon_list');

function init() {
    showLoadingScreen();
    showPokemonList();
    renderPokemonsMainList(1, 6);
}

async function getPokemonData(path = "") {
    let response = await fetch(BASE_URL + path);
    let pokemonResponseAsJson = await response.json();
    return createPokemonsMainList(pokemonResponseAsJson);
}

function createPokemonsMainList(pokemonResponseAsJson) {
    return {
        id: pokemonResponseAsJson.id,
        name: pokemonResponseAsJson.name,
        img_url: pokemonResponseAsJson.sprites.other.dream_world.front_default,
        types: pokemonResponseAsJson.types.map(typeElement => {
            return typeElement.type.name
        })
    };
}

async function renderPokemonsMainList(start, end) {
    for (let index = start; index < end; index++) {
        let pokemonObj = await getPokemonData(index);
        pokemonsMainList.push(pokemonObj);
    }
    return pokemonsMainList;
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