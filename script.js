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
let contentPokeomonCardDialog = document.getElementById('pokemon_card');
let contentPokemonCard = document.getElementById('pokemon_card_content');
let contentNavigationAbout = document.getElementById('navigation_about');
let currentPokemonCard = 0;

function init() {
    showPokemonsList();
    initPokemonsList();
}

async function initPokemonsList() {
    showLoadingScreenFirstTime();
    await renderPokemonsMainList(1, 21);
    currentPokemonsMainList = pokemonsMainList;
    renderPokemonCard();
    closeLoadingScreen();
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
    let pokemonObj = createPokemonsMainList(pokemonResponseAsJson, pokemonSpeciesResponseAsJson);
    let pokemonObjBaseStates = createPokemonsBaseStatesList(pokemonResponseAsJson);
    let pokemonObjEvolution = createPokemonsEvoList(pokemonEvolutionResponseAsJson);
    pokemonsMainList[id - 1] = pokemonObj;
    pokemonsBaseStatesList[id - 1] = pokemonObjBaseStates;
    pokemonsEvoList[id - 1] = pokemonObjEvolution;
    return pokemonObj, pokemonObjBaseStates, pokemonObjEvolution;
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
        checkTextColor(pokemonCardIndex);
        checkAmountOfTypes(pokemonCardIndex);
        addEvolutionStepsToPokemonsMainList(pokemonCardIndex);
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

function checkTextColorInBaseStats(pokemonCardIndex) {
    let contentBaseStateBars = [
        document.getElementById(`base_stat_bar_${pokemonCardIndex}_0`),
        document.getElementById(`base_stat_bar_${pokemonCardIndex}_1`),
        document.getElementById(`base_stat_bar_${pokemonCardIndex}_2`),
        document.getElementById(`base_stat_bar_${pokemonCardIndex}_3`),
        document.getElementById(`base_stat_bar_${pokemonCardIndex}_4`),
        document.getElementById(`base_stat_bar_${pokemonCardIndex}_5`)
    ];
    if (whiteAndYellowBg(pokemonCardIndex)) {
        styleGreyBars(contentBaseStateBars);
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

function styleGreyBars(pokeStateBars) {
    pokeStateBars.forEach(bar => {
        bar.style.color = 'rgba(158, 156, 156, 1)';
    });
}

function checkTextColorOfPokeCardDialog(pokemonCardIndex) {
    let contentPokemonCardIdAtDialog = document.getElementById(`pokemon_card_id_${pokemonCardIndex}`);
    let contentPokemonCardNameAtDialog = document.getElementById(`pokemon_card_name_${pokemonCardIndex}`);
    let contentPokemonCardNextButton = document.getElementById(`next_pokemon_${pokemonCardIndex}`);
    let contentPokemonCardPreviousButton = document.getElementById(`previous_pokemon_${pokemonCardIndex}`);
    if (whiteAndYellowBg(pokemonCardIndex)) {
        styleGreyAtPokeCardDialog(contentPokemonCardIdAtDialog, contentPokemonCardNameAtDialog);
        styleBgGreyAtPokeCardDialog(contentPokemonCardNextButton, contentPokemonCardPreviousButton);
    }
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

function showPokemonsList() {
    setTimeout(() => {
        contentPokemonList.classList.remove('pokemon_list_none');
    }, 2000);
}

function filterAndShowPokemonCards() {
    let filterWord = contentSearchInput.value;
    let filterWordExist = pokemonsMainList.some(pokemon => pokemon.name.includes(filterWord));
    if (filterWord.length >= 3) {
        currentPokemonsMainList = pokemonsMainList.filter(pokemon => pokemon.name.includes(filterWord));
    } else {
        currentPokemonsMainList = pokemonsMainList;
        alert("No Pokemon with this name was found!");
    }
    renderPokemonCard();
}

async function loadMorePokemons() {
    showLoadingScreenAgain();
    await renderPokemonsMainList(1, 41);
    closeLoadingScreenAgain();
    renderPokemonCard();
    toggleButtonsClass();
}

function loadLessPokemons() {
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
    let contentPokemonInformationEvolution = document.getElementById(`evolution_${pokemonCardIndex}`);
    switchToPokemonCardInformation(navigationCondition, contentPokemonInformationAbout, contentPokemonInformationBaseState, contentPokemonInformationEvolution);
    changeClassPokemonNavigation(pokemonCardIndex, navigationCondition);
    addEvolutionImages(pokemonCardIndex);
    notShowEvolutionSecond(pokemonCardIndex);
    checkTextColorInBaseStats(pokemonCardIndex);
}

function switchToPokemonCardInformation(navigationCondition, about, baseStates, evolution) {
    switch (navigationCondition) {
        case "about":
            changeClassOfPokemonCard(about, baseStates, evolution);
            break;
        case "base_states":
            changeClassOfPokemonCard(baseStates, about, evolution);
            break;
        case "evolution":
            changeClassOfPokemonCard(evolution, baseStates, about);
            break;
    }
}

function changeClassOfPokemonCard(removeClassDsiplayNone, addClassDsiplayNoneOne, addClassDsiplayNoneTwo) {
    removeClassDsiplayNone.classList.remove("pokemon_information_none");
    addClassDsiplayNoneOne.classList.add("pokemon_information_none");
    addClassDsiplayNoneTwo.classList.add("pokemon_information_none");
}

function changeClassPokemonNavigation(pokemonCardIndex, navigationCondition,) {
    let contentNavigationAbout = document.getElementById(`navigation_about_${pokemonCardIndex}`);
    let contentNavigationBaseStates = document.getElementById(`navigation_base_states_${pokemonCardIndex}`);
    let contentNavigationEvolution = document.getElementById(`navigation_evolution_${pokemonCardIndex}`);
    removeClassPokemonNavigation(contentNavigationAbout, contentNavigationBaseStates, contentNavigationEvolution);
    addClassOnePokemonNavigation(navigationCondition, pokemonCardIndex);
}

function removeClassPokemonNavigation(about, baseStates, evolution) {
    [about, baseStates, evolution].forEach(link => {
        link.classList.remove("pokemon_card_navigation_link_active");
    });
}

function addClassOnePokemonNavigation(navigationCondition, pokemonCardIndex) {
    let contentNavigationActive = document.getElementById(`navigation_${navigationCondition}_${pokemonCardIndex}`);
    contentNavigationActive.classList.add("pokemon_card_navigation_link_active");
}

function addEvolutionImages(pokemonCardIndex) {
    let contentEvolutionImages = document.getElementById(`evolution_${pokemonCardIndex}`);
    contentEvolutionImages.innerHTML = getPokemonCardEvolutionTemplate(pokemonCardIndex);
}

function notShowEvolutionSecond(pokemonCardIndex) {
    if (currentPokemonsMainList[pokemonCardIndex].evolution_steps.evolution_end == undefined) {
        let contentEvolutionSecond = document.getElementById(`pokemon_evolution_to_second_${pokemonCardIndex}`);
        let contentEvolutionSecondImg = document.getElementById(`pokemon_evolution_to_second_img_${pokemonCardIndex}`);
        contentEvolutionSecond.classList.add('pokemon_information_none');
        contentEvolutionSecondImg.classList.add('pokemon_information_none');
    }
}