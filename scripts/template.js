function getPokemonCardTemplate(pokemonCardIndex) {
    return `<article class="pokemon_card" style="background-color: ${pokemonsMainList[pokemonCardIndex].color} ">
                <h3 id="pokemon_id_${pokemonCardIndex}" class="pokemon_id">#${pokemonsMainList[pokemonCardIndex].id}</h3>
                <figure class="pokemon_img_name">
                    <img class="pokemon_img_size" src="${pokemonsMainList[pokemonCardIndex].img_url}"
                    <figcaption class="pokemon_img_name">
                        <h2 id="pokemon_name_${pokemonCardIndex}" class="pokemon_name">${pokemonsMainList[pokemonCardIndex].name}</h2>
                    </figcaption>
                </figure>
                <div id="pokemon_types_${pokemonCardIndex}" class="pokemon_types">
                    <p>${pokemonsMainList[pokemonCardIndex].types[0]}</p>
                    <p>${pokemonsMainList[pokemonCardIndex].types[1]}</p>
                </div> 
            </article>
            `
}