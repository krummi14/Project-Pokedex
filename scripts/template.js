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
                        <img class="pokemon_img_size_card" src="${currentPokemonsMainList[pokemonCardIndex].img_url}">  
                    </div>
                </div> 
            </header>
            <div class="pokemon_card_information">
                <nav class="pokemon_card_navigation">
                    <a id="navigation_about_${pokemonCardIndex}" onclick="openPokemonInformation(${pokemonCardIndex}, 'about')" class="pokemon_card_navigation_link pokemon_card_navigation_link_active" href="#about_${pokemonCardIndex}">About</a>
                    <a id="navigation_base_states_${pokemonCardIndex}" onclick="openPokemonInformation(${pokemonCardIndex}, 'base_states')" class="pokemon_card_navigation_link pokemon_card_navigation_link_base_stats" href="#base_states_${pokemonCardIndex}">Base Stats</a>
                    <a id="navigation_evolution_${pokemonCardIndex}" onclick="openPokemonInformation(${pokemonCardIndex}, 'evolution')" class="pokemon_card_navigation_link" href="#evolution">Evolution</a>
                </nav> 
                <span class="pokemon_informations">
                    <span id="about_${pokemonCardIndex}">
                        <table>
                            <tr>
                                <td>Height:</td>
                                <td class="row_padding_left">${(currentPokemonsMainList[pokemonCardIndex].height / 10)} m</td>
                            </tr>
                            <tr>
                                <td>Weight:</td>
                                <td class="row_padding_left">${(currentPokemonsMainList[pokemonCardIndex].weight / 10)} kg</td>
                            </tr>
                            <tr>
                                <td>Base Experience:</td>
                                <td class="row_padding_left">${currentPokemonsMainList[pokemonCardIndex].base_experience}</td>
                            </tr>
                            <tr>
                                <td>Abilities:</td>
                                <td class="row_padding_left">${currentPokemonsMainList[pokemonCardIndex].abilities[0]}, ${currentPokemonsMainList[pokemonCardIndex].abilities[1]}</td>
                            </tr>
                        </table>
                    </span>
                    <span id="base_states_${pokemonCardIndex}" class="pokemon_information_none">
                        <table class="base_stat_table">
                            <tr>
                                <td class="base_stat_name">${pokemonsBaseStatesList[pokemonCardIndex].base_stats[0].stat.name}:</td>
                                <td class="base_stat_value" style="border: 2px solid ${currentPokemonsMainList[pokemonCardIndex].color}"><div id="base_stat_bar_${pokemonCardIndex}_0" class="base_stat_bar" style="width: ${pokemonsBaseStatesList[pokemonCardIndex].base_stats[0].base_stat / 1.5}%; background-color: ${currentPokemonsMainList[pokemonCardIndex].color}">${pokemonsBaseStatesList[pokemonCardIndex].base_stats[0].base_stat}</div></td>
                            </tr>
                            <tr>
                                <td class="base_stat_name">${pokemonsBaseStatesList[pokemonCardIndex].base_stats[1].stat.name}:</td>
                                <td class="base_stat_value" style="border: 2px solid ${currentPokemonsMainList[pokemonCardIndex].color}"><div id="base_stat_bar_${pokemonCardIndex}_1" class="base_stat_bar" style="width: ${pokemonsBaseStatesList[pokemonCardIndex].base_stats[1].base_stat / 1.5}%; background-color: ${currentPokemonsMainList[pokemonCardIndex].color}">${pokemonsBaseStatesList[pokemonCardIndex].base_stats[1].base_stat}</div></td>
                            </tr>
                            <tr>
                                <td class="base_stat_name">${pokemonsBaseStatesList[pokemonCardIndex].base_stats[2].stat.name}:</td>
                                <td class="base_stat_value" style="border: 2px solid ${currentPokemonsMainList[pokemonCardIndex].color}"><div id="base_stat_bar_${pokemonCardIndex}_2" class="base_stat_bar" style="width: ${pokemonsBaseStatesList[pokemonCardIndex].base_stats[2].base_stat / 1.5}%; background-color: ${currentPokemonsMainList[pokemonCardIndex].color}">${pokemonsBaseStatesList[pokemonCardIndex].base_stats[2].base_stat}</div></td>
                            </tr>
                            <tr>
                                <td class="base_stat_name">${pokemonsBaseStatesList[pokemonCardIndex].base_stats[3].stat.name}:</td>
                                <td class="base_stat_value" style="border: 2px solid ${currentPokemonsMainList[pokemonCardIndex].color}"><div id="base_stat_bar_${pokemonCardIndex}_3" class="base_stat_bar" style="width: ${pokemonsBaseStatesList[pokemonCardIndex].base_stats[3].base_stat / 1.5}%; background-color: ${currentPokemonsMainList[pokemonCardIndex].color}">${pokemonsBaseStatesList[pokemonCardIndex].base_stats[3].base_stat}</div></td>
                            </tr>
                            <tr>
                                <td class="base_stat_name">${pokemonsBaseStatesList[pokemonCardIndex].base_stats[4].stat.name}:</td>
                                <td class="base_stat_value" style="border: 2px solid ${currentPokemonsMainList[pokemonCardIndex].color}"><div id="base_stat_bar_${pokemonCardIndex}_4" class="base_stat_bar" style="width: ${pokemonsBaseStatesList[pokemonCardIndex].base_stats[4].base_stat / 1.5}%; background-color: ${currentPokemonsMainList[pokemonCardIndex].color}">${pokemonsBaseStatesList[pokemonCardIndex].base_stats[4].base_stat}</div></td>
                            </tr>
                            <tr>
                                <td class="base_stat_name">${pokemonsBaseStatesList[pokemonCardIndex].base_stats[5].stat.name}:</td>
                                <td class="base_stat_value" style="border: 2px solid ${currentPokemonsMainList[pokemonCardIndex].color}"><div id="base_stat_bar_${pokemonCardIndex}_5" class="base_stat_bar" style="width: ${pokemonsBaseStatesList[pokemonCardIndex].base_stats[5].base_stat / 1.5}%; background-color: ${currentPokemonsMainList[pokemonCardIndex].color}">${pokemonsBaseStatesList[pokemonCardIndex].base_stats[5].base_stat}</div></td>
                            </tr>
                        </table>
                    </span>
                    <span id="evolution_${pokemonCardIndex}" class="pokemon_information_none">
                        
                    </span>
                </span>
            </div>
            <footer class="pokemon_card_footer">
                <button onclick="nextOrPreviousPokemonCard(${pokemonCardIndex}, 'previous')" id="previous_pokemon_${pokemonCardIndex}" class="button pokemon_card_nexTo_button" style="background-color: ${currentPokemonsMainList[pokemonCardIndex].color}">&#8592</button>
                <button onclick="nextOrPreviousPokemonCard(${pokemonCardIndex}, 'next')" id="next_pokemon_${pokemonCardIndex}" class="button pokemon_card_nexTo_button" style="background-color: ${currentPokemonsMainList[pokemonCardIndex].color}">&#8594</button>
            </footer>
            `
}

function getPokemonCardEvolutionTemplate(pokemonCardIndex) {
    return `<div class="pokemon_evolution">
                <img class="pokemon_img_size_card pokemon_img_size_card_respo" src="${currentPokemonsMainList[pokemonCardIndex].evolution_steps.evolution_start_img}">
                <p class="pokemon_evolution_to">>></p>
                <img class="pokemon_img_size_card pokemon_img_size_card_respo" src="${currentPokemonsMainList[pokemonCardIndex].evolution_steps.evolution_to_img}">
                <p id="pokemon_evolution_to_second_${pokemonCardIndex}" class="pokemon_evolution_to">>></p>
                <img id="pokemon_evolution_to_second_img_${pokemonCardIndex}" class="pokemon_img_size_card pokemon_img_none pokemon_img_size_card_respo" src="${currentPokemonsMainList[pokemonCardIndex].evolution_steps.evolution_end_img}">
            </div>
            `
}