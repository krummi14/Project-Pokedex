function getMainPokemonCardTemplate(pokemonCardIndex) {
    return `<article onclick="openCurrentPokemonCard(${pokemonCardIndex})" class="pokemon_main_card" style="background-color: ${currentPokemonsMainList[pokemonCardIndex].color}">
                <h3 id="pokemon_id_${pokemonCardIndex}" class="pokemon_id"># ${currentPokemonsMainList[pokemonCardIndex].id}</h3>
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
                <span class="pokemon_card_designation">
                    <h4 id="pokemon_card_id_${pokemonCardIndex}" class="pokemon_id_card"># ${currentPokemonsMainList[pokemonCardIndex].id}</h4>
                    <h2 id="pokemon_card_name_${pokemonCardIndex}" class="pokemon_name_card">${currentPokemonsMainList[pokemonCardIndex].name}</h2>
                </span>
                <div>
                    <div id="pokemon_card_types_${pokemonCardIndex}" class="pokemon_types pokemon_types_gap">
                        <div class="pokemon_types_row">
                            <p class="pokemon_type pokemon_type_color">${currentPokemonsMainList[pokemonCardIndex].types[0]}</p>
                            <p class="pokemon_type pokemon_type_color" id="second_pokemon_card_type_${pokemonCardIndex}">${currentPokemonsMainList[pokemonCardIndex].types[1]}</p>
                        </div>
                        <img class="pokemon_img_size_card" src="${currentPokemonsMainList[pokemonCardIndex].img_url}"  
                    </div>
                </div> 
            </header>
            <div><p>Navigation About, Base States, Gender, Evolution</p></div>
            <footer class="pokemon_card_footer">
                <button onclick="nextOrPreviousPokemonCard(${pokemonCardIndex}, 'previous')" id="previous_pokemon_${pokemonCardIndex}" class="button pokemon_card_nexTo_button" style="background-color: ${currentPokemonsMainList[pokemonCardIndex].color}">&#8592</button>
                <button onclick="nextOrPreviousPokemonCard(${pokemonCardIndex}, 'next')" id="next_pokemon_${pokemonCardIndex}" class="button pokemon_card_nexTo_button" style="background-color: ${currentPokemonsMainList[pokemonCardIndex].color}">&#8594</button>
            </footer>
            `
}