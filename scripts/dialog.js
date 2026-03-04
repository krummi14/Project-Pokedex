function checkTextColorInBaseStats(pokemonCardIndex) {
    let contentBaseStateBars = [
        document.getElementById(`base_stat_bar_${pokemonCardIndex}_0`),
        document.getElementById(`base_stat_bar_${pokemonCardIndex}_1`),
        document.getElementById(`base_stat_bar_${pokemonCardIndex}_2`),
        document.getElementById(`base_stat_bar_${pokemonCardIndex}_3`),
        document.getElementById(`base_stat_bar_${pokemonCardIndex}_4`),
        document.getElementById(`base_stat_bar_${pokemonCardIndex}_5`)];
    if (whiteAndYellowBg(pokemonCardIndex)) {
        styleGreyBars(contentBaseStateBars);
    }
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
        element.style.color = 'rgba(158, 156, 156, 1)';
    });
}

function styleBgGreyAtPokeCardDialog(nextButton, previousButton) {
    [nextButton, previousButton].forEach(element => {
        element.style.backgroundColor = 'rgba(158, 156, 156, 1)';
        element.style.color = 'white';
    });
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

function openCurrentPokemonCard(pokemonCardIndex) {
    currentPokemonCard = pokemonCardIndex;
    openPokemonCard(null, pokemonCardIndex);
    stopMovingToNextOrPreviousPocemonCard(pokemonCardIndex, currentPokemonCard);
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
    stopMovingToNextOrPreviousPocemonCard(pokemonCardIndex);
}

function stopMovingToNextOrPreviousPocemonCard(pokemonCardIndex) {
    let contentBothButtons = document.getElementById(`pokemon_card_footer_${pokemonCardIndex}`)
    let contentPokemonCardNextButton = document.getElementById(`next_pokemon_${pokemonCardIndex}`);
    let contentPokemonCardPreviousButton = document.getElementById(`previous_pokemon_${pokemonCardIndex}`);
    if (pokemonCardIndex <= 0) {
        pokemonCardIndex = 0;
        contentPokemonCardPreviousButton.classList.add("pokemon_information_none");
        contentBothButtons.style.justifyContent = "end";
    } else if (pokemonCardIndex >= currentPokemonsMainList.length - 1) {
        pokemonCardIndex = currentPokemonsMainList.length - 1;
        contentPokemonCardNextButton.classList.add("pokemon_information_none");
        contentBothButtons.style.justifyContent = "start";
    }
}

function openPokemonInformation(pokemonCardIndex, navigationCondition) {
    let contentPokemonInformationAbout = document.getElementById(`about_${pokemonCardIndex}`);
    let contentPokemonInformationBaseState = document.getElementById(`base_states_${pokemonCardIndex}`);
    let contentPokemonInformationEvolution = document.getElementById(`evolution_${pokemonCardIndex}`);
    switchToPokemonCardInformation(navigationCondition, contentPokemonInformationAbout, contentPokemonInformationBaseState, contentPokemonInformationEvolution);
    changeClassPokemonNavigation(pokemonCardIndex, navigationCondition);
    addEvolutionImages(pokemonCardIndex);
    notShowEvolutionSecond(pokemonCardIndex);
    createBaseStateTable(pokemonCardIndex);
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
    let contentImageEvolutionStart = document.getElementById(`pokemon_evolution_start_img_${pokemonCardIndex}`);
    let contentImageEvolutionEnd = document.getElementById(`pokemon_evolution_to_second_img_${pokemonCardIndex}`);
    let contentEvolutionArrow = document.getElementById(`evolution_to_${pokemonCardIndex}`);
    let contentEvolutionArrowSec = document.getElementById(`pokemon_evolution_to_second_${pokemonCardIndex}`);
    setImageOrHide(contentEvolutionArrow, contentImageEvolutionStart, currentPokemonsMainList[pokemonCardIndex].evolution_steps.evolution_start_img);
    setImageOrHide(contentEvolutionArrowSec, contentImageEvolutionEnd, currentPokemonsMainList[pokemonCardIndex].evolution_steps.evolution_end_img);
}

function setImageOrHide(arrowElement, imgElement, url) {
    if (!imgElement) return;
    if (!url || url == "undefined" || url == "null") {
        imgElement.classList.add("pokemon_information_none");
        arrowElement.classList.add("pokemon_information_none");
        return;
    }
    imgElement.src = url;
    imgElement.onerror = () => {
        imgElement.classList.add("pokemon_information_none");
        arrowElement.classList.add("pokemon_information_none");
    };
}

function removeUndefinedImage(pokemonCardIndex) {
    let contentImageEvolutionStart = document.getElementById(`pokemon_evolution_start_img_${pokemonCardIndex}`);
    let contentImageEvolutionEnd = document.getElementById(`pokemon_evolution_to_second_img_${pokemonCardIndex}`);
    if (contentImageEvolutionStart.src == undefined) {
        contentImageEvolutionStart.classList.add("pokemon_information_none");
    }
}

function notShowEvolutionSecond(pokemonCardIndex) {
    if (currentPokemonsMainList[pokemonCardIndex].evolution_steps.evolution_end == undefined) {
        let contentEvolutionSecond = document.getElementById(`pokemon_evolution_to_second_${pokemonCardIndex}`);
        let contentEvolutionSecondImg = document.getElementById(`pokemon_evolution_to_second_img_${pokemonCardIndex}`);
        contentEvolutionSecond.classList.add('pokemon_information_none');
        contentEvolutionSecondImg.classList.add('pokemon_information_none');
    }
}

function createBaseStateTable(pokemonCardIndex) {
    let contentTableBaseStats = document.getElementById(`table_content_${pokemonCardIndex}`);
    contentTableBaseStats.innerHTML = "";
    for (let baseStatIndex = 0; baseStatIndex < pokemonsBaseStatesList[pokemonCardIndex].base_stats.length; baseStatIndex++) {
        contentTableBaseStats.innerHTML += getPokemonCardBaseStatsTemplate(pokemonCardIndex, baseStatIndex);
    }
    checkTextColorInBaseStats(pokemonCardIndex);
}