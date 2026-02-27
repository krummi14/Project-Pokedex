let BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
let SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species/'
let pokemonsMainList = [];
let currentPokemonsMainList = [];
let pokemonsBaseStatesList = [];
let contentLoadingScreen = document.getElementById('loading_screen');
let contentPokemonList = document.getElementById('pokemon_list');
let contentPokemonCardList = document.getElementById('pokemon_card_list');
let contentSearchInput = document.getElementById('search_input_value');
let contentLoadLessButton = document.getElementById('load_less_button');
let contentLoadMoreButton = document.getElementById('load_more_button');
let contentPokeomonCardDialog = document.getElementById('pokemon_card');
let contentPokemonCard = document.getElementById('pokemon_card_content');
let contentNavigationAbout = document.getElementById('navigation_about');
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
    if (pokemonsMainList[id - 1] && pokemonsBaseStatesList[id - 1]) {
        return pokemonsMainList[id - 1], pokemonsBaseStatesList[id - 1];
    } else {
        await fetchPokemonData(id);
    }
}

async function fetchPokemonData(id = "") {
    let pokemonResponse = await fetch(BASE_URL + id);
    let pokemonResponseAsJson = await pokemonResponse.json();
    let speciesResponse = await fetch(SPECIES_URL + id);
    let pokemonSpeciesResponseAsJson = await speciesResponse.json();
    let pokemonObj = createPokemonsMainList(pokemonResponseAsJson, pokemonSpeciesResponseAsJson);
    let pokemonObjBaseStates = createPokemonsBaseStatesList(pokemonResponseAsJson);
    pokemonsMainList[id - 1] = pokemonObj;
    pokemonsBaseStatesList[id - 1] = pokemonObjBaseStates;
    return pokemonObj, pokemonObjBaseStates;
}

function createPokemonsMainList(pokemonResponseAsJson, pokemonSpeciesResponseAsJson) {
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

function createPokemonsBaseStatesList(pokemonResponseAsJson) {
    return {
        id: pokemonResponseAsJson.id,
        name: pokemonResponseAsJson.name,
        base_stats: pokemonResponseAsJson.stats
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

function checkTextColorOfPokeCardDialog(pokemonCardIndex) {
    let contentPokemonCardIdAtDialog = document.getElementById(`pokemon_card_id_${pokemonCardIndex}`);
    let contentPokemonCardNameAtDialog = document.getElementById(`pokemon_card_name_${pokemonCardIndex}`);
    let contentPokemonCardNextButton = document.getElementById(`next_pokemon_${pokemonCardIndex}`);
    let contentPokemonCardPreviousButton = document.getElementById(`previous_pokemon_${pokemonCardIndex}`);
    if (whiteAndYellowBgAtPokeCardDialog(pokemonCardIndex)) {
        styleGreyAtPokeCardDialog(contentPokemonCardIdAtDialog, contentPokemonCardNameAtDialog);
        styleBgGreyAtPokeCardDialog(contentPokemonCardNextButton, contentPokemonCardPreviousButton);
    }
}

function whiteAndYellowBgAtPokeCardDialog(pokemonCardIndex) {
    return currentPokemonsMainList[pokemonCardIndex].color == 'white' || currentPokemonsMainList[pokemonCardIndex].color == 'yellow';
}

function styleGreyAtPokeCardDialog(pokeId, pokeName) {
    [pokeId, pokeName].forEach(element => {
        element.style = 'color: rgba(158, 156, 156, 1)';
    });
}

function styleBgGreyAtPokeCardDialog(nextButton, previousButton) {
    [nextButton, previousButton].forEach(element => {
        element.style.backgroundColor = 'rgba(158, 156, 156, 1)';
        element.style.color = 'white';
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

function checkAmountOfTypesAtPokemonCardDialog(pokemonCardIndex) {
    let contentSecondPokemonTypeAtPokemonCard = document.getElementById(`second_pokemon_card_type_${pokemonCardIndex}`);
    let contentPokemonCardTypesAtPokemonDialog = document.getElementById(`pokemon_card_types_${pokemonCardIndex}`);
    if (typeTextIsUndefinedAtPokemonCardDialog(contentSecondPokemonTypeAtPokemonCard)) {
        stylePokeCardAtPokeDialog(contentSecondPokemonTypeAtPokemonCard, contentPokemonCardTypesAtPokemonDialog);
    }
}

function typeTextIsUndefinedAtPokemonCardDialog(contentSecondPokemonTypeAtPokemonCard) {
    return contentSecondPokemonTypeAtPokemonCard.innerText == "undefined";
}

function stylePokeCardAtPokeDialog(contentSecondPokemonTypeAtPokemonCard, contentPokemonCardTypesAtPokemonDialog) {
    contentSecondPokemonTypeAtPokemonCard.classList.add("pokemon_type_none");
    contentPokemonCardTypesAtPokemonDialog.style = 'justify-content: center';
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
    document.body.classList.add('scroll_lock');
    checkAmountOfTypesAtPokemonCardDialog(pokemonCardIndex);
    checkTextColorOfPokeCardDialog(pokemonCardIndex);
}

function closePokemonCard() {
    recreatePokemonCard();
    setTimeout(() => {
        contentPokeomonCardDialog.close();
    }, 125);
}

function recreatePokemonCard() {
    contentPokeomonCardDialog.classList.remove("dialog_opend");
    document.body.classList.remove('scroll_lock');
}

function closePokemonCardOnBodyclick(event) {
    event.stopPropagation()
}

function nextOrPreviousPokemonCard(pokemonCardIndex, buttonCondition) {
    if (buttonCondition == "next") {
        currentPokemonCard++;
    } else if (buttonCondition == "previous") {
        currentPokemonCard--;
    }
    pokemonCardIndex = currentPokemonCard;
    createPokemonCard(pokemonCardIndex);
}

function openPokemonInformation(pokemonCardIndex, navigationCondition) {
    let contentPokemonInformationAbout = document.getElementById(`about_${pokemonCardIndex}`);
    let contentPokemonInformationBaseState = document.getElementById(`base_states_${pokemonCardIndex}`);
    let contentPokemonInformationGender = document.getElementById(`gender_${pokemonCardIndex}`);
    let contentPokemonInformationEvolution = document.getElementById(`evolution_${pokemonCardIndex}`);
    switchToPokemonCardInformation(navigationCondition, contentPokemonInformationAbout, contentPokemonInformationBaseState, contentPokemonInformationGender, contentPokemonInformationEvolution);
    changeClassPokemonNavigation(pokemonCardIndex, navigationCondition);
}

function switchToPokemonCardInformation(navigationCondition, about, baseStates, gender, evolution) {
    switch (navigationCondition) {
        case "about":
            changeClassOfPokemonCard(about, baseStates, gender, evolution);
            break;
        case "base_states":
            changeClassOfPokemonCard(baseStates, about, gender, evolution);
            break;
        case "gender":
            changeClassOfPokemonCard(gender, baseStates, about, evolution);
            break;
        case "evolution":
            changeClassOfPokemonCard(evolution, gender, baseStates, about);
            break;
    }
}

function changeClassOfPokemonCard(removeClassDsiplayNone, addClassDsiplayNoneOne, addClassDsiplayNoneTwo, addClassDsiplayNoneThree) {
    removeClassDsiplayNone.classList.remove("pokemon_information_none");
    addClassDsiplayNoneOne.classList.add("pokemon_information_none");
    addClassDsiplayNoneTwo.classList.add("pokemon_information_none");
    addClassDsiplayNoneThree.classList.add("pokemon_information_none");
}

function changeClassPokemonNavigation(pokemonCardIndex, navigationCondition,) {
    let contentNavigationAbout = document.getElementById(`navigation_about_${pokemonCardIndex}`);
    let contentNavigationBaseStates = document.getElementById(`navigation_base_states_${pokemonCardIndex}`);
    let contentNavigationGender = document.getElementById(`navigation_gender_${pokemonCardIndex}`);
    let contentNavigationEvolution = document.getElementById(`navigation_evolution_${pokemonCardIndex}`);
    removeClassPokemonNavigation(contentNavigationAbout, contentNavigationBaseStates, contentNavigationGender, contentNavigationEvolution);
    addClassOnePokemonNavigation(navigationCondition, pokemonCardIndex);
}

function removeClassPokemonNavigation(about, baseStates, gender, evolution) {
    [about, baseStates, gender, evolution].forEach(link => {
        link.classList.remove("pokemon_card_navigation_link_active");
    });
}

function addClassOnePokemonNavigation(navigationCondition, pokemonCardIndex) {
    let contentNavigationActive = document.getElementById(`navigation_${navigationCondition}_${pokemonCardIndex}`);
    contentNavigationActive.classList.add("pokemon_card_navigation_link_active");
}