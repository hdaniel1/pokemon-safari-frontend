document.addEventListener("DOMContentLoaded", init)

function init(){
  //ensure pokemon, trainer, and nature objects are created, then assign natures to pokemon
  Promise.all([Pokemon.fetchPokemon(), Nature.fetchNatures(), Trainer.fetchTrainers()])
  .then(responses => responses[0].forEach(pokemon => pokemon.assignNature()))

  //shuffle current pokemon based on page type
  document.querySelector("#shuffle").addEventListener("click", function() {
    if (document.body.className) {
    document.querySelector(".dropbtn").innerText = document.body.className
    Pokemon.all = []
    document.querySelector("#pokemon_container").innerHTML = ""
    Pokemon.fetchType(document.querySelector("body").className)
    .then(pokemons => pokemons.forEach(pokemon => pokemon.assignNature()))
    }
    else {
      Pokemon.all = []
      document.querySelector("#pokemon_container").innerHTML = ""
      Pokemon.fetchPokemon()
      .then(pokemons => pokemons.forEach(pokemon => pokemon.assignNature()))
    }
  })
  //change shown pokemon by type
  document.querySelectorAll(".pokemon-type").forEach(type => {
    type.addEventListener("click", function(){
      document.querySelector("#audio").src = event.target.dataset.music
      document.querySelector("body").dataset.music = event.target.dataset.music
      document.body.classList = ""
      document.body.classList.add(event.target.innerText)
      document.querySelector(".dropbtn").innerText = event.target.innerText
      Pokemon.all = []
      document.querySelector("#pokemon_container").innerHTML = ""
      Pokemon.fetchType(event.target.innerText)
      .then(pokemons => pokemons.forEach(pokemon => pokemon.assignNature()))
    })
  })
}
