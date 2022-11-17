const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const typesPokemon = document.getElementById("types");
const statsPokemon = document.getElementById("stats");
const abilitiesPokemon = document.getElementById("abilities");
const modalBackgroudColor = document.getElementById("modalColor");
const namePokemon = document.getElementById("namePokemon");
const imagePokemon = document.querySelector("#imagePokemon");;

const maxRecords = 151
const limit = 10
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
        <li onclick="idPokemon(this)" id="${pokemon.number}" value="" class="pokemon ${pokemon.type}" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
});



// Puxa o tipo do pokemon
function pokemonCaracterTypeToLi(item, indice) {
    typesPokemon.innerHTML += "<li class='listDetails detailPokemonItem mb-2'><div class='text-center'><span class='p-1 rounded "+item.type.name+"'>"+item.type.name+"</span></div></li>";
}

// Puxa as estatiticas do pokemon
function pokemonCaracterStatsToLi(item, indice) {
    let colorPoint = "highPoint";

    if(item.base_stat < 50) {
        colorPoint = "lowPoint";
    }

    statsPokemon.innerHTML += "<div class='row detailPokemonItem'><div class='col-8'>"+item.stat.name+"</div><div class='col-4 "+colorPoint+"'>"+item.base_stat+"</div></div>"; 
}

// Puxa as habilidades do pokemon
function pokemonCaracterAbilitiesToLi(item, indice) {
    abilitiesPokemon.innerHTML += "<li class='listDetails detailPokemonItem'><div class='text-center'>"+item.ability.name+"</div></li>"; 
}

function idPokemon(elemento){
    pokeApiCaracterPokemon.getPokemonsCaracter(elemento.id).then((details) => {

        details.types.forEach(pokemonCaracterTypeToLi);
        details.stats.forEach(pokemonCaracterStatsToLi);
        details.abilities.forEach(pokemonCaracterAbilitiesToLi);

        modalBackgroudColor.classList.add(details.types[0].type.name);

        // Colocar primeira letra em maiscula
        namePoke = details.name.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
            return a.toUpperCase();
        });
        namePokemon.innerHTML = namePoke;

        // Imagem do pokemon
        imagePokemon.setAttribute('src', ""+details.sprites.other.dream_world.front_default+"");

        console.log(details);
    })
}