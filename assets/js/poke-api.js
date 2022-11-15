
const pokeApi = {}
const pokeApiCaracterPokemon = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}




// Pega os as habilidades e caracteristicas do pokemon
function apiCaracterToPokemon(pokeCaracter) {
    const pokemonCaracter = new PokemonAbout()
    pokemonCaracter.number = pokeCaracter.id
    pokemonCaracter.name = pokeCaracter.name

    const nameAbilities = pokeCaracter.abilities.map((abilityList) => abilityList.ability.name)
    pokemonCaracter.abilities = nameAbilities


    const nameStats = pokeCaracter.stats.map((statsList) => statsList.stat.name)
    pokemonCaracter.stats.nameStats = nameStats

    const pontsStats = pokeCaracter.stats.map((statsList) => statsList.base_stat)
    pokemonCaracter.stats.pontsStats = pontsStats

    return pokemonCaracter
}


pokeApiCaracterPokemon.getPokemonCaracter = (pokemonCaracter) => {
    return fetch(pokemonCaracter.url)
        .then((response) => response.json())
        .then(apiCaracterToPokemon)
}


pokeApiCaracterPokemon.getPokemonsCaracter = (id = 1) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApiCaracterPokemon.getPokemonCaracter))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}