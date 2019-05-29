document.addEventListener("DOMContentLoaded", init)

function init(){
  setTimeout(function(){
    Pokemon.all.forEach(pokemon => pokemon.assignNature()); }, 3000);
  // let promise1 = Promise.resolve(Pokemon.all)
  Promise.all([Pokemon.fetchPokemon(), Nature.fetchNatures(), Trainer.fetchTrainers()])
  //shuffle current pokemon based on type
  document.querySelector("#shuffle").addEventListener("click", function() {

    if (document.body.className) {
    document.querySelector(".dropbtn").innerText = document.body.className
    Pokemon.all = []
    document.querySelector("#pokemon_container").innerHTML = ""
    Pokemon.fetchType(document.querySelector("body").className)
    }
    else {
      Pokemon.all = []
      document.querySelector("#pokemon_container").innerHTML = ""
      Pokemon.fetchPokemon()
    }
  })
  //change pokemon by type
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
    })
  })
}
