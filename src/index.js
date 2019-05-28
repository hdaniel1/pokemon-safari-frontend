document.addEventListener("DOMContentLoaded", init)

function init(){
  Promise.all([Pokemon.fetchPokemon(), Nature.fetchNatures(), Trainer.fetchTrainers()])
  Pokemon.all.forEach(pokemon => {
    pokemon.assignNature()
  })
}
