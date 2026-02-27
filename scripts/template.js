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
            <div class="pokemon_card_information">
                <nav class="pokemon_card_navigation">
                    <a id="navigation_about_${pokemonCardIndex}" onclick="openPokemonInformation(${pokemonCardIndex}, 'about')" class="pokemon_card_navigation_link pokemon_card_navigation_link_active" href="#about_${pokemonCardIndex}">About</a>
                    <a id="navigation_base_states_${pokemonCardIndex}" onclick="openPokemonInformation(${pokemonCardIndex}, 'base_states')" class="pokemon_card_navigation_link" href="#base_states_${pokemonCardIndex}">Base Stats</a>
                    <a id="navigation_gender_${pokemonCardIndex}" onclick="openPokemonInformation(${pokemonCardIndex}, 'gender')" class="pokemon_card_navigation_link" href="#gender">Gender</a>
                    <a id="navigation_evolution_${pokemonCardIndex}" onclick="openPokemonInformation(${pokemonCardIndex}, 'evolution')" class="pokemon_card_navigation_link" href="#evolution">Evolution</a>
                </nav> 
                <span class="pokemon_informations">
                    <span id="about_${pokemonCardIndex}">
                        <table>
                            <tr>
                                <td>Height:</td>
                                <td>${(currentPokemonsMainList[pokemonCardIndex].height / 10)} m</td>
                            </tr>
                            <tr>
                                <td>Weight:</td>
                                <td>${(currentPokemonsMainList[pokemonCardIndex].weight / 10)} kg</td>
                            </tr>
                            <tr>
                                <td>Base Experience:</td>
                                <td>${currentPokemonsMainList[pokemonCardIndex].base_experience}</td>
                            </tr>
                            <tr>
                                <td>Abilities:</td>
                                <td>${currentPokemonsMainList[pokemonCardIndex].abilities[0]}, ${currentPokemonsMainList[pokemonCardIndex].abilities[1]}</td>
                            </tr>
                        </table>
                    </span>
                    <span id="base_states_${pokemonCardIndex}" class="pokemon_information_none">
                        <table>
                            <tr>
                                <td>${pokemonsBaseStatesList[pokemonCardIndex].base_stats[0].stat.name}:</td>
                                <td>${pokemonsBaseStatesList[pokemonCardIndex].base_stats[0].base_stat}</td>
                            </tr>
                            <tr>
                                <td>${pokemonsBaseStatesList[pokemonCardIndex].base_stats[1].stat.name}:</td>
                                <td>${pokemonsBaseStatesList[pokemonCardIndex].base_stats[1].base_stat}</td>
                            </tr>
                            <tr>
                                <td>${pokemonsBaseStatesList[pokemonCardIndex].base_stats[2].stat.name}:</td>
                                <td>${pokemonsBaseStatesList[pokemonCardIndex].base_stats[2].base_stat}</td>
                            </tr>
                            <tr>
                                <td>${pokemonsBaseStatesList[pokemonCardIndex].base_stats[3].stat.name}:</td>
                                <td>${pokemonsBaseStatesList[pokemonCardIndex].base_stats[3].base_stat}</td>
                            </tr>
                            <tr>
                                <td>${pokemonsBaseStatesList[pokemonCardIndex].base_stats[4].stat.name}:</td>
                                <td>${pokemonsBaseStatesList[pokemonCardIndex].base_stats[4].base_stat}</td>
                            </tr>
                            <tr>
                                <td>${pokemonsBaseStatesList[pokemonCardIndex].base_stats[5].stat.name}:</td>
                                <td>${pokemonsBaseStatesList[pokemonCardIndex].base_stats[5].base_stat}</td>
                            </tr>
                        </table>
                    </span>
                    <span id="gender_${pokemonCardIndex}" class="pokemon_information_none">
                        <p>gender</p>
                    </span>
                    <span id="evolution_${pokemonCardIndex}" class="pokemon_information_none">
                        <p>evolution</p>
                    </span>
                </span>
            <footer class="pokemon_card_footer">
                <button onclick="nextOrPreviousPokemonCard(${pokemonCardIndex}, 'previous')" id="previous_pokemon_${pokemonCardIndex}" class="button pokemon_card_nexTo_button" style="background-color: ${currentPokemonsMainList[pokemonCardIndex].color}">&#8592</button>
                <button onclick="nextOrPreviousPokemonCard(${pokemonCardIndex}, 'next')" id="next_pokemon_${pokemonCardIndex}" class="button pokemon_card_nexTo_button" style="background-color: ${currentPokemonsMainList[pokemonCardIndex].color}">&#8594</button>
            </footer>
            `
}