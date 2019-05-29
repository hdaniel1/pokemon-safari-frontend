class Trainer{
  constructor(trainer){
    this.id = trainer.id
    this.name = trainer.name
    this.username = trainer.username
    Trainer.all.push(this)
  }

  seeMyPokemon() {
    let pokemonModal = document.createElement("div")
    pokemonModal.classList.add("bg-modal-pokemon-info")
    let pokemonModalContent = document.createElement("div")
    pokemonModalContent.classList.add("modal-content")
    let pokemonClose = document.createElement("div")
    let pokemonModalBody = document.createElement("div")
    pokemonClose.classList.add("close")
    pokemonClose.style.visibility = "visible"
    pokemonClose.innerText = "+"
    pokemonModal.style.display = "flex"
    pokemonModalBody.classList.add("bg-modal-body")

    pokemonModalContent.appendChild(pokemonClose)
    pokemonClose.addEventListener("click", function() {
    pokemonModal.style.display = "none";
    });

    TrainerPokemon.all.forEach(pokemon => {
      let pokemonModalHeader = document.createElement("div")
      let pokemonDiv = document.createElement("div")
      let pokemonClose = document.createElement("div")
      let pokemonImage = document.createElement("img")
      let pokemonModalTitle = document.createElement("h4")
      let pokemonInfo = document.createElement("ul")
      let pokemonAbility = document.createElement("li")
      let pokemonNature = document.createElement("li")
      let pokemonType = document.createElement("li")
      let releaseButton = document.createElement("button")
      let pokemonNickname = document.createElement("INPUT")
      pokemonNickname.setAttribute("type", "text");
      pokemonNickname.setAttribute("placeholder", "Edit Nickname:");
      pokemonNickname.setAttribute("size", "12");

      ['keypress','keyup', 'input'].forEach( someEvent =>
        pokemonNickname.addEventListener(someEvent, pokemon.adjustContent))
      //
      // pokemonNickname.addEventListener('keypress', pokemon.adjustContent)
      // pokemonNickname.addEventListener('keyup', pokemon.setTextFieldContent)
      pokemonModalHeader.classList.add("bg-modal-header")
      pokemonModalTitle.classList.add("bg-modal-title")
      pokemonInfo.classList.add("pokemon-info")
      pokemonDiv.classList.add("pokemon-info-div")
      pokemonNickname.classList.add("pokemon-textfield")

      pokemonNickname.value = pokemon.nickname
      releaseButton.innerText = "Release"
      releaseButton.dataset.id = pokemon.id
      pokemonAbility.innerText = `Ability: ${pokemon.ability}`
      pokemonType.innerText = `Type: ${pokemon.type_1}/${pokemon.type_2}`
      pokemonNature.innerText = `Nature: ${pokemon.nature}`
      pokemonModalTitle.innerText = pokemon.species
      pokemonImage.src = pokemon.image

      pokemonInfo.append(pokemonNickname, pokemonAbility, pokemonType, pokemonNature)
      pokemonModalHeader.append(pokemonModalTitle, pokemonImage, pokemonInfo, releaseButton)
      pokemonDiv.appendChild(pokemonModalHeader)
      pokemonModalContent.appendChild(pokemonDiv)
      pokemonModal.appendChild(pokemonModalContent)

      //add release event listener
      releaseButton.addEventListener("click", pokemon.releasePokemon)
    })
    document.body.appendChild(pokemonModal)
  }



  createMyPokemonObjects(event) {
    let trainerId = this.id
    fetch(`http://localhost:3000/trainer_pokemons`)
    .then(resp => resp.json())
    .then(pokemons => pokemons.forEach(pokemon => {
      if (pokemon.trainer_id === 1) {
        new TrainerPokemon (pokemon.id,
                            pokemon.nickname,
                            pokemon.pokemon.species,
                            pokemon.nature,
                            pokemon.pokemon.type_1,
                            pokemon.pokemon.type_2,
                            pokemon.pokemon.ability,
                            pokemon.pokemon.sprite_image)
      }
    }))
  }

  static fetchTrainers(){
    fetch("http://localhost:3000/trainers/1")
    .then(resp => resp.json())
    .then(trainer => {
      let trainerInstance = new Trainer(trainer)
      trainerInstance.createMyPokemonObjects()
      document.querySelector("#my-pokemon").addEventListener("click", function() {

        trainerInstance.seeMyPokemon()
      })
    })
  }

  static all = []
}
