let BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
let SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species/';
let EVO_URL = 'https://pokeapi.co/api/v2/evolution-chain/';
let pokemonsMainList = [];
let currentPokemonsMainList = [];
let pokemonsBaseStatesList = [];
let pokemonsEvoList = [];
let contentLoadingScreen = document.getElementById('loading_screen');
let contentPokemonList = document.getElementById('pokemon_list');
let contentPokemonCardList = document.getElementById('pokemon_card_list');
let contentSearchInput = document.getElementById('search_input_value');
let contentLoadLessButton = document.getElementById('load_less_button');
let contentLoadMoreButton = document.getElementById('load_more_button');
let contentShowButton = document.getElementById('show_all_button');
let contentPokeomonCardDialog = document.getElementById('pokemon_card');
let contentPokemonCard = document.getElementById('pokemon_card_content');
let contentNavigationAbout = document.getElementById('navigation_about');
let contentSearchInformation = document.getElementById("search_information");
let contentFooter = document.getElementById("footer");
let currentPokemonCard = 0;

async function initPokemonsList() {
    showLoadingScreenFirstTime();
    await renderPokemonsMainList(1, 21);
    currentPokemonsMainList = pokemonsMainList;
    renderPokemonCard();
    closeLoadingScreen();
    showPokemonsList();
}

function showPokemonsList() {
    contentPokemonList.classList.remove('pokemon_list_none');
}

async function getPokemonData(id = "") {
    if (pokemonsMainList[id - 1] && pokemonsBaseStatesList[id - 1] && pokemonsEvoList[0]) {
        return pokemonsMainList[id - 1], pokemonsBaseStatesList[id - 1], pokemonsEvoList[0];
    } else {
        await fetchPokemonData(id);
    }
}

async function fetchPokemonData(id = "") {
    let pokemonResponse = await fetch(BASE_URL + id);
    let pokemonResponseAsJson = await pokemonResponse.json();
    let speciesResponse = await fetch(SPECIES_URL + id);
    let pokemonSpeciesResponseAsJson = await speciesResponse.json();
    let evoResponse = await fetch(EVO_URL + id);
    let pokemonEvolutionResponseAsJson = await evoResponse.json();
    createAllLists(id, pokemonResponseAsJson, pokemonSpeciesResponseAsJson, pokemonEvolutionResponseAsJson)
}

function createAllLists(id, pokemonResponseAsJson, pokemonSpeciesResponseAsJson, pokemonEvolutionResponseAsJson) {
    let pokemonObj = createPokemonsMainList(pokemonResponseAsJson, pokemonSpeciesResponseAsJson);
    let pokemonObjBaseStates = createPokemonsBaseStatesList(pokemonResponseAsJson);
    let pokemonObjEvolution = createPokemonsEvoList(pokemonEvolutionResponseAsJson);
    pokemonsMainList[id - 1] = pokemonObj;
    pokemonsBaseStatesList[id - 1] = pokemonObjBaseStates;
    pokemonsEvoList[id - 1] = pokemonObjEvolution;
    return {
        pokemonObj,
        pokemonObjBaseStates,
        pokemonObjEvolution
    };
}

function createPokemonsMainList(pokemonResponseAsJson, pokemonSpeciesResponseAsJson) {
    defineColorOfPokemonsMainList(pokemonResponseAsJson, pokemonSpeciesResponseAsJson);
    return {
        id: pokemonResponseAsJson.id,
        name: pokemonResponseAsJson.name,
        img_url: pokemonResponseAsJson.sprites.other.dream_world.front_default,
        types: pokemonResponseAsJson.types.map(typeElement => {
            return typeElement.type.name
        }),
        height: pokemonResponseAsJson.height,
        weight: pokemonResponseAsJson.weight,
        base_experience: pokemonResponseAsJson.base_experience,
        abilities: pokemonResponseAsJson.abilities.map(abilityElement => {
            return abilityElement.ability.name
        }),
        color: pokemonSpeciesResponseAsJson.color.name
    };
}

function defineColorOfPokemonsMainList(pokemonResponseAsJson, pokemonSpeciesResponseAsJson) {
    if (pokemonResponseAsJson.types[0].type.name == "bug") {
        pokemonSpeciesResponseAsJson.color.name = "white";
    }
    if (pokemonResponseAsJson.types.length == 2 && pokemonResponseAsJson.types[0].type.name == "bug" && pokemonResponseAsJson.types[1].type.name == "poison") {
        pokemonSpeciesResponseAsJson.color.name = "yellow";
    }
    if (pokemonResponseAsJson.types.length == 1 && pokemonResponseAsJson.types[0].type.name == "normal") {
        pokemonSpeciesResponseAsJson.color.name = "purple";
    }
    if (pokemonResponseAsJson.types[0].type.name == "fire") {
        pokemonSpeciesResponseAsJson.color.name = "red";
    }
}

function createPokemonsBaseStatesList(pokemonResponseAsJson) {
    return {
        id: pokemonResponseAsJson.id,
        name: pokemonResponseAsJson.name,
        base_stats: pokemonResponseAsJson.stats
    };
}

function createPokemonsEvoList(pokemonEvolutionResponseAsJson) {
    let second = undefined;
    if (pokemonEvolutionResponseAsJson.chain.evolves_to[0].evolves_to.length > 0) {
        second = pokemonEvolutionResponseAsJson.chain.evolves_to[0].evolves_to[0].species.name;
    } else {
        second;
    }
    return {
        evolution_start: pokemonEvolutionResponseAsJson.chain.species.name,
        evolution_to: pokemonEvolutionResponseAsJson.chain.evolves_to[0].species.name,
        evolution_end: second
    }
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
        checkAmountOfTypes(pokemonCardIndex);
        addEvolutionStepsToPokemonsMainList(pokemonCardIndex);
        checkTextColor(pokemonCardIndex);
    }
}

function addEvolutionStepsToPokemonsMainList(pokemonCardIndex) {
    for (let index = 0; index < pokemonsEvoList.length; index++) {
        if (pokemonsEvoList[index].evolution_start == currentPokemonsMainList[pokemonCardIndex].name || pokemonsEvoList[index].evolution_to == currentPokemonsMainList[pokemonCardIndex].name || pokemonsEvoList[index].evolution_end == currentPokemonsMainList[pokemonCardIndex].name) {
            currentPokemonsMainList[pokemonCardIndex].evolution_steps = pokemonsEvoList[index];
            if (currentPokemonsMainList[pokemonCardIndex].name == pokemonsEvoList[index].evolution_start) {
                pokemonsEvoList[index].evolution_start_img = currentPokemonsMainList[pokemonCardIndex].img_url;
            } else if (currentPokemonsMainList[pokemonCardIndex].name == pokemonsEvoList[index].evolution_to) {
                pokemonsEvoList[index].evolution_to_img = currentPokemonsMainList[pokemonCardIndex].img_url;
            } else if (currentPokemonsMainList[pokemonCardIndex].name == pokemonsEvoList[index].evolution_end) {
                pokemonsEvoList[index].evolution_end_img = currentPokemonsMainList[pokemonCardIndex].img_url;
            }
        }
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
        element.style.color = 'rgba(158, 156, 156, 1)';
    });
}

function styleGreyBars(pokeStateBars) {
    pokeStateBars.forEach(bar => {
        bar.style.color = 'rgba(158, 156, 156, 1)';
    });
}

function checkAmountOfTypes(pokemonCardIndex) {
    let contentSecondPokemonType = document.getElementById(`second_pokemon_type_${pokemonCardIndex}`);
    let contentPokemonCardTypes = document.getElementById(`pokemon_types_${pokemonCardIndex}`);
    if (typeTextIsUndefined(contentSecondPokemonType)) {
        stylePokeCard(contentSecondPokemonType, contentPokemonCardTypes);
        checkTextColor(pokemonCardIndex);
    }
}

function stylePokeCard(contentSecondPokemonType, contentPokemonCardTypes) {
    contentSecondPokemonType.classList.add("pokemon_type_none");
    contentPokemonCardTypes.style.justifyContent = 'center';
}

function typeTextIsUndefined(contentSecondPokemonType) {
    return contentSecondPokemonType.innerText == "undefined";
}

function showLoadingScreenFirstTime() {
    addLoadingScreen();
}

function showLoadingScreenAgain() {
    addLoadingScreen();
    addLoadingScreenAsOverlay();
}

function addLoadingScreen() {
    contentLoadingScreen.classList.remove('loading_screen_none');
}

function closeLoadingScreen() {
    contentLoadingScreen.classList.add('loading_screen_none');
}

function closeLoadingScreenAgain() {
    contentLoadingScreen.classList.remove('loading_screen_overlay');
    document.body.classList.remove('scroll_lock');
    closeLoadingScreen();
}

function addLoadingScreenAsOverlay() {
    contentLoadingScreen.classList.add('loading_screen_overlay');
    document.body.classList.add('scroll_lock');
}

function filterAndShowPokemonCards() {
    let filterWord = contentSearchInput.value;
    if (filterWord.length >= 3) {
        currentPokemonsMainList = pokemonsMainList.filter(pokemon => pokemon.name.includes(filterWord));
        removeShowButton();
        if (currentPokemonsMainList == 0) {
            showSearchInformation();
            contentShowButton.classList.add('load_button_none');
            contentLoadMoreButton.classList.remove('load_button_none');
        }
    } else {
        showSearchInformation();
    }
    renderPokemonCard();
}

function removeShowButton() {
    contentLoadMoreButton.classList.add('load_button_none');
    contentLoadLessButton.classList.add('load_button_none');
    contentShowButton.classList.remove('load_button_none');
}

function showSearchInformation() {
    currentPokemonsMainList = pokemonsMainList;
    openInfoToWriteAtLeastThreeLetters();
    addSearchInformationAsOverlay();
}

function addSearchInformationAsOverlay() {
    contentSearchInformation.classList.add('loading_screen_overlay');
    document.body.classList.add('scroll_lock');
}

function openInfoToWriteAtLeastThreeLetters() {
    contentSearchInformation.classList.remove("pokemon_information_none");
}

function closeSearchInformation() {
    contentSearchInformation.classList.add("pokemon_information_none");
    document.body.classList.remove('scroll_lock');
}

async function loadMorePokemons() {
    showLoadingScreenAgain();
    await renderPokemonsMainList(currentPokemonsMainList.length, currentPokemonsMainList.length + 21);
    closeLoadingScreenAgain();
    renderPokemonCard();
    checkIfPokemonHasThreeEvolutionSteps();
    renderPokemonCard();
    contentFooter.scrollIntoView();
    if (currentPokemonsMainList.length == 40) {
        toggleButtonsClass(contentLoadMoreButton, contentLoadLessButton);
    }
}

function checkIfPokemonHasThreeEvolutionSteps() {
    for (let index = 0; index < currentPokemonsMainList.length; index++) {
        if (currentPokemonsMainList[index].evolution_steps.evolution_end == undefined && (currentPokemonsMainList.length - 1) == currentPokemonsMainList[index].id || currentPokemonsMainList[index].evolution_steps.evolution_start == 'pichu' && (currentPokemonsMainList.length - 1) == currentPokemonsMainList[index].id || currentPokemonsMainList[index].evolution_steps.evolution_start == 'cleffa' && (currentPokemonsMainList.length - 1) == currentPokemonsMainList[index].id) {
            currentPokemonsMainList.pop();
        }
    }
}

function showAllPokemons() {
    currentPokemonsMainList = pokemonsMainList;
    renderPokemonCard();
    contentShowButton.classList.add('load_button_none');
    contentFooter.scrollIntoView();
    if (currentPokemonsMainList.length == 40) {
        contentLoadMoreButton.classList.add('load_button_none');
        contentLoadLessButton.classList.remove('load_button_none');
    } else {
        contentLoadMoreButton.classList.remove('load_button_none');
        contentLoadLessButton.classList.add('load_button_none');
    }
}

function loadLessPokemons() {
    currentPokemonsMainList.length -= 19;
    currentPokemonsMainList.pop();
    renderPokemonCard();
    contentFooter.scrollIntoView();
    if (currentPokemonsMainList.length == 20) {
        toggleButtonsClass(contentLoadLessButton, contentLoadMoreButton);
    }
}

function toggleButtonsClass(addClass, removeClass) {
    addClass.classList.add('load_button_none');
    removeClass.classList.remove('load_button_none');
}