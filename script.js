let BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
let SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species/'
let pokemonsMainList = [];
let currentPokemonsMainList = [];
let contentLoadingScreen = document.getElementById('loading_screen');
let contentPokemonList = document.getElementById('pokemon_list');
let contentPokemonCardList = document.getElementById('pokemon_card_list');
let contentSearchInput = document.getElementById('search_input_value');
let contentLoadLessButton = document.getElementById('load_less_button');
let contentLoadMoreButton = document.getElementById('load_more_button');
let contentPokeomonCardDialog = document.getElementById('pokemon_card');
let contentPokemonCard = document.getElementById('pokemon_card_content');
let currentPokemonCard = 0;

function init() {
    showLoadingScreenFirstTime();
    showPokemonsList();
    initPokemonsList();
}

async function initPokemonsList() {
    await renderPokemonsMainList(1, 41);
    currentPokemonsMainList = pokemonsMainList.slice(0, 20);
    renderPokemonCard();
}

async function getPokemonData(id = "") {
    if (pokemonsMainList[id - 1]) {
        return pokemonsMainList[id - 1];
    } else {
        let pokemonResponse = await fetch(BASE_URL + id);
        let pokemonResponseAsJson = await pokemonResponse.json();
        let speciesResponse = await fetch(SPECIES_URL + id);
        let pokemonSpeciesResponseAsJson = await speciesResponse.json();
        let pokemonObj = createPokemonsMainList(pokemonResponseAsJson, pokemonSpeciesResponseAsJson);
        pokemonsMainList[id - 1] = pokemonObj;
        return pokemonObj;
    }
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
        await getPokemonData(index);
    }
}

function renderPokemonCard() {
    contentPokemonCardList.innerHTML = "";
    for (let pokemonCardIndex = 0; pokemonCardIndex < currentPokemonsMainList.length; pokemonCardIndex++) {
        contentPokemonCardList.innerHTML += getMainPokemonCardTemplate(pokemonCardIndex);
        checkTextColor(pokemonCardIndex);
        checkAmountOfTypes(pokemonCardIndex);
    }
}

function checkTextColor(pokemonCardIndex) {
    let contentPokemonCardId = document.getElementById(`pokemon_id_${pokemonCardIndex}`);
    let contentPokemonCardName = document.getElementById(`pokemon_name_${pokemonCardIndex}`);
    let contentPokemonCardTypes = document.getElementById(`pokemon_types_${pokemonCardIndex}`);
    if (whiteAndYellowBg(pokemonCardIndex)) {
        styleGrey(contentPokemonCardId, contentPokemonCardName, contentPokemonCardTypes);
    }
}

function whiteAndYellowBg(pokemonCardIndex) {
    return currentPokemonsMainList[pokemonCardIndex].color == 'white' || currentPokemonsMainList[pokemonCardIndex].color == 'yellow';
}

function styleGrey(pokeId, pokeName, pokeType) {
    [pokeId, pokeName, pokeType].forEach(element => {
        element.style = 'color: rgba(158, 156, 156, 1)';
    });
}

function checkAmountOfTypes(pokemonCardIndex) {
    let contentSecondPokemonType = document.getElementById(`second_pokemon_type_${pokemonCardIndex}`);
    let contentPokemonCardTypes = document.getElementById(`pokemon_types_${pokemonCardIndex}`);
    if (typeTextIsUndefined(contentSecondPokemonType)) {
        stylePokeCard(contentSecondPokemonType, contentPokemonCardTypes);
    }
}

function typeTextIsUndefined(contentSecondPokemonType) {
    return contentSecondPokemonType.innerText == "undefined";
}

function stylePokeCard(contentSecondPokemonType, contentPokemonCardTypes) {
    contentSecondPokemonType.classList.add("pokemon_type_none");
    contentPokemonCardTypes.style = 'justify-content: center';
}

function showLoadingScreenFirstTime() {
    addLoadingScreenTwoSek();
}

function showLoadingScreenAgain() {
    addLoadingScreenTwoSek();
    addLoadingScreenAsOverlay();
}

function addLoadingScreenTwoSek() {
    contentLoadingScreen.classList.remove('loading_screen_none');
    setTimeout(() => {
        contentLoadingScreen.classList.add('loading_screen_none');
    }, 2000);
}

function addLoadingScreenAsOverlay() {
    contentLoadingScreen.classList.add('loading_screen_overlay');
    document.body.classList.add('scroll_lock');
    setTimeout(() => {
        contentLoadingScreen.classList.remove('loading_screen_overlay');
        document.body.classList.remove('scroll_lock');
    }, 2000);
}

function showPokemonsList() {
    setTimeout(() => {
        contentPokemonList.classList.remove('pokemon_list_none');
    }, 2000);
}

function filterAndShowPokemonCards() {
    let filterWord = contentSearchInput.value;
    if (filterWord.length >= 3) {
        currentPokemonsMainList = pokemonsMainList.filter(pokemon => pokemon.name.includes(filterWord));
    } else {
        currentPokemonsMainList = pokemonsMainList;
    }
    renderPokemonCard();
}

function loadMorePokemons() {
    showLoadingScreenAgain();
    for (let index = currentPokemonsMainList.length; index < pokemonsMainList.length; index++) {
        currentPokemonsMainList.push(pokemonsMainList[index]);
    }
    renderPokemonCard();
    toggleButtonsClass();
}

function loadLessPokemons() {
    showLoadingScreenAgain();
    for (let index = currentPokemonsMainList.length; index > 20; index--) {
        currentPokemonsMainList.pop();
    }
    renderPokemonCard();
    toggleButtonsClass();
}

function toggleButtonsClass() {
    contentLoadLessButton.classList.toggle('load_button_none');
    contentLoadMoreButton.classList.toggle('load_button_none');
}

function openCurrentPokemonCard(pokemonCardIndex) {
    currentPokemonCard = pokemonCardIndex;
    openPokemonCard(null, pokemonCardIndex);
}

function openPokemonCard(event, pokemonCardIndex) {
    if (event) event.stopPropagation();
    createPokemonCard(pokemonCardIndex);
}

function createPokemonCard(pokemonCardIndex) {
    contentPokemonCard.innerHTML = getPokemonCardTemplate(pokemonCardIndex);
    contentPokeomonCardDialog.showModal();
    contentPokeomonCardDialog.classList.add("dialog_opend");
    document.body.classList.toggle('scroll_lock');
}

function closePokemonCard() {
    recreatePokemonCard();
    setTimeout(() => {
        contentPokeomonCardDialog.close();
    }, 125);
}

function recreatePokemonCard() {
    contentPokeomonCardDialog.classList.remove("dialog_opend");
    document.body.classList.toggle('scroll_lock');
}

function closePokemonCardOnBodyclick(event) {
    event.stopPropagation()
}