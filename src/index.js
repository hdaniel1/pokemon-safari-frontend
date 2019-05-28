document.addEventListener("DOMContentLoaded", init)

function init(){
  Promise.all([Pokemon.fetchPokemon(), Nature.fetchNatures()])
  Pokemon.all.forEach(pokemon => {
    pokemon.assignNature()
  })
}
