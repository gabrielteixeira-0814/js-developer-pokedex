const pokemonList = document.getElementById('pokemonList');
//const statsPokemon = document.getElementById("stats");
const abilitiesPokemon = document.getElementById("abilities");
const modalBackgroudColor = document.getElementById("modalColor");
const namePokemon = document.getElementById("namePokemon");
const imagePokemon = document.querySelector("#imagePokemon");
const loadingGif = document.getElementById("wrapper");

// Oculta gif
loadingGif.style.visibility = 'hidden';

const maxRecords = 151;
const limit = 10;
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
        <li onclick="idPokemon(this);" id="${pokemon.number}" value="" class="pokemon ${pokemon.type} shadow" data-bs-toggle="modal" data-bs-target="#exampleModal">
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

const loadMoreButton = document.getElementById('loadMoreButton');

loadMoreButton.addEventListener('click', () => {


    loadMoreButton.style.visibility = 'hidden';
    loadingGif.style.visibility = 'visible';

    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {
        setTimeout(function() {
            loadMoreButton.style.visibility = 'visible';
            loadingGif.style.visibility = 'hidden';
            loadPokemonItens(offset, limit)
        }, 2000)
    }
});


 // Puxa o tipo do pokemon
function pokemonCaracterTypeToLi(item, indice) {
    const typesPokemon = document.getElementById("typesPokemon");

    typesPokemon.innerHTML += "<li class='listDetails detailPokemonItem mb-2' id='list'><div class='text-center'><span class='p-1 rounded "+item.type.name+"'>"+item.type.name+"</span></div></li>";
}

// Puxa as estatiticas do pokemon
function pokemonCaracterStatsToLi(item, indice) {
    const statsPokemon = document.getElementById("typesStats");

    let colorPoint = "highPoint";

    if(item.base_stat < 50) {
        colorPoint = "lowPoint";
    }

    statsPokemon.innerHTML += "<div class='row detailPokemonItem listDetails' id='list'><div class='col-8'>"+item.stat.name+"</div><div class='col-4 "+colorPoint+"'>"+item.base_stat+"</div></div>"; 
}

// Puxa as habilidades do pokemon
function pokemonCaracterAbilitiesToLi(item, indice) {
    const abilitiesPokemon = document.getElementById("typeAbilities");

    abilitiesPokemon.innerHTML += "<li class='listDetails detailPokemonItem' id='list'><div class='text-center p-1'><span class='p-1 rounded abilitiesList'><span><img id='imagePokemon' src='assets/image/thunder.png' alt='image' style='width: 10px;'></span> "+item.ability.name+"</span></div></li>"; 
}

  // Puxa os dados da api
function idPokemon(elemento){
   
    pokeApiCaracterPokemon.getPokemonsCaracter(elemento.id).then((details) => {
   
        if(details){
            remover();
        }

        details.types.forEach(pokemonCaracterTypeToLi);
        details.stats.forEach(pokemonCaracterStatsToLi);
        details.abilities.forEach(pokemonCaracterAbilitiesToLi);
        
        modalBackgroudColor.classList.add("modal-content");
        modalBackgroudColor.classList.add("text-white");
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

function remover(){
   
    const typesPokemon = document.getElementById("typesPokemon");
    typesPokemon.remove();
    let div = document.createElement('div');
    div.setAttribute("id", "typesPokemon");
    div.classList.add("typesPokemon");
    document.getElementById('detailsTypes').appendChild(div).innerHTML;

    const statsPokemon = document.getElementById("typesStats");
    statsPokemon.remove();
    let divStatsPokemon = document.createElement('div');
    divStatsPokemon.setAttribute("id", "typesStats");
    divStatsPokemon.classList.add("typesStats");
    document.getElementById('detailsStats').appendChild(divStatsPokemon).innerHTML;

    const abilitiesPokemon = document.getElementById("typeAbilities");
    abilitiesPokemon.remove();
    let divAbilitiesPokemon = document.createElement('div');
    divAbilitiesPokemon.setAttribute("id", "typeAbilities");
    divAbilitiesPokemon.classList.add("typeAbilities");
    document.getElementById('detailsAbilities').appendChild(divAbilitiesPokemon).innerHTML;

    // Remover class modalColor
    document.getElementById("modalColor").className = '';
   
 }


