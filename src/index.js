document.addEventListener("DOMContentLoaded", init)

function init(){
  setTimeout(function(){
    Pokemon.all.forEach(pokemon => pokemon.assignNature()); }, 3000);
  // let promise1 = Promise.resolve(Pokemon.all)
  Promise.all([Pokemon.fetchPokemon(), Nature.fetchNatures(), Trainer.fetchTrainers()])
  document.querySelector("#shuffle").addEventListener("click", function() {
    Pokemon.all = []
    document.querySelector("#pokemon_container").innerHTML = ""
    Pokemon.fetchPokemon()
  })
}
