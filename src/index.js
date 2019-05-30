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

  //show about info on click
  document.querySelector("#about").addEventListener("click", function() {
    //create elements
    let aboutModal = document.createElement("div")
    let aboutModalContent = document.createElement("div")
    let aboutClose = document.createElement("div")
    //add element info
    aboutClose.classList.add("close")
    aboutClose.style.visibility = "visible"
    aboutClose.innerText = "+"
    aboutModal.classList.add("bg-modal-about-info")
    aboutModalContent.classList.add("modal-content-about")
    aboutModal.style.display = "flex"
    aboutModalContent.innerHTML = "Welcome to the Pokemon Safari app.<br><br> To get started click any pokemon sprite to see that pokemon's info. Click \"catch\" to add that pokemon to your pokedex.<br><br> You can also change the type of the pokemon shown using the type dropdown, as well as shuffle the current pokemon shown by clicking \"Shuffle\".<br><br> To view your pokedex, click \"My Pokemon\", where you can add a nickname or release your pokemon."
    //append elements
    document.body.appendChild(aboutModal)
    aboutModal.appendChild(aboutModalContent)
    aboutModal.appendChild(aboutClose)
    //event listner for close
    aboutClose.addEventListener("click", function() {
    document.querySelector("#audio").src = document.querySelector("body").dataset.music
    aboutModal.style.display = "none";
    });

  })
}
