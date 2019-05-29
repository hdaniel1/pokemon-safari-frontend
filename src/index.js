document.addEventListener("DOMContentLoaded", init)

function init(){
  setTimeout(function(){
    Pokemon.all.forEach(pokemon => pokemon.assignNature()); }, 3000);
  // let promise1 = Promise.resolve(Pokemon.all)
  Promise.all([Pokemon.fetchPokemon(), Nature.fetchNatures(), Trainer.fetchTrainers()])
  //shuffle current pokemon based on type
  document.querySelector("#shuffle").addEventListener("click", function() {
    let type = document.querySelector("body").className
    document.querySelector(".dropbtn").innerText = type
    Pokemon.all = []
    document.querySelector("#pokemon_container").innerHTML = ""
    Pokemon.fetchType(type)
  })
  //change pokemon by type
  document.querySelectorAll(".pokemon-type").forEach(type => {
    type.addEventListener("click", function(){
      document.body.classList = ""
      document.body.classList.add(event.target.innerText)
      document.querySelector(".dropbtn").innerText = event.target.innerText
      Pokemon.all = []
      document.querySelector("#pokemon_container").innerHTML = ""
      Pokemon.fetchType(event.target.innerText)
    })
  })
}
