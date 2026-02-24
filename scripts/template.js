function getMainPokemonCardTemplate(pokemonCardIndex) {
    return `<article onclick="openCurrentPokemonCard(${pokemonCardIndex})" class="pokemon_main_card" style="background-color: ${currentPokemonsMainList[pokemonCardIndex].color}">
                <h3 id="pokemon_id_${pokemonCardIndex}" class="pokemon_id">#${currentPokemonsMainList[pokemonCardIndex].id}</h3>
                <figure class="pokemon_img_name">
                    <img class="pokemon_img_size" src="${currentPokemonsMainList[pokemonCardIndex].img_url}"
                    <figcaption class="pokemon_img_name">
                        <h2 id="pokemon_name_${pokemonCardIndex}" class="pokemon_name">${currentPokemonsMainList[pokemonCardIndex].name}</h2>
                    </figcaption>
                </figure>
                <div id="pokemon_types_${pokemonCardIndex}" class="pokemon_types">
                    <p class="pokemon_type">${currentPokemonsMainList[pokemonCardIndex].types[0]}</p>
                    <p class="pokemon_type" id="second_pokemon_type_${pokemonCardIndex}">${currentPokemonsMainList[pokemonCardIndex].types[1]}</p>
                </div> 
            </article>
            `
}

function getPokemonCardTemplate(pokemonCardIndex) {
    return `<header class="pokemon_card_header" style="background-color: ${currentPokemonsMainList[pokemonCardIndex].color}">
            <h2 id="pokemon_card_name_${pokemonCardIndex}" class="pokemon_name">${currentPokemonsMainList[pokemonCardIndex].name}</h2>
            <h4 id="pokemon_card_id_${pokemonCardIndex}" class="pokemon_id">#${currentPokemonsMainList[pokemonCardIndex].id}</h3>
                <div id="pokemon_card_types_${pokemonCardIndex}" class="pokemon_types">
                    <p class="pokemon_type">${currentPokemonsMainList[pokemonCardIndex].types[0]}</p>
                    <p class="pokemon_type" id="second_pokemon_card_type_${pokemonCardIndex}">${currentPokemonsMainList[pokemonCardIndex].types[1]}</p>
                </div> 
            </header>
            <div><p>Navigation About, Base States, Gender, Evolution</p></div>
            <footer><p>Next or before</p></footer>
            `
}