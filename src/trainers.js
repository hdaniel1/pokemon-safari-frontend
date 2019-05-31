class Trainer{
  //constructor for trainer instance object
  constructor(trainer){
    this.id = trainer.id
    this.name = trainer.name
    this.username = trainer.username
    Trainer.all.push(this)
  }
  //see the logged in trainer's trainerpokemon in the DOM
  seeMyPokemon() {
    if(TrainerPokemon.all.length > 0) {
    document.querySelector("#audio").src = "assets/pokedex_theme.mp3"
    let pokemonModal = document.createElement("div")
    pokemonModal.classList.add("bg-modal-pokemon-info")
    let pokemonModalContent = document.createElement("div")
    pokemonModalContent.classList.add("modal-content")
    pokemonModalContent.classList.add("w3-animate-zoom")
    let pokemonClose = document.createElement("div")
    let pokemonModalBody = document.createElement("div")
    pokemonClose.classList.add("close")
    pokemonClose.style.visibility = "visible"
    pokemonClose.innerText = "+"
    pokemonModal.style.display = "flex"
    pokemonModalBody.classList.add("bg-modal-body")

    pokemonModalContent.appendChild(pokemonClose)
    pokemonClose.addEventListener("click", function() {
    document.querySelector("#audio").src = document.querySelector("body").dataset.music
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
      let pokemonNickname = document.createElement("li")
      let releaseButton = document.createElement("button")
      //create nickname stuff
      let pokemonNicknameFormButton = document.createElement("button")

      pokemonModalHeader.classList.add("bg-modal-header")
      pokemonModalTitle.classList.add("bg-modal-title")
      pokemonInfo.classList.add("pokemon-info")
      pokemonDiv.classList.add("pokemon-info-div")

      releaseButton.innerText = "Release"
      releaseButton.dataset.id = pokemon.id
      releaseButton.classList.add("pokemonshow-form-btn")
      pokemonNickname.dataset.textId = pokemon.id
      pokemonAbility.innerText = `Ability: ${pokemon.ability}`
      pokemonType.innerText = pokemon.type_2 ? `Type 1: ${pokemon.type_1}/${pokemon.type_2}` : `Type 1: ${pokemon.type_1}`
      pokemonNature.innerText = `Nature: ${pokemon.nature}`
      pokemonNickname.innerText = pokemon.nickname ? `Nickname: ${pokemon.nickname}` : `Nickname: N/A`
      pokemonNickname.id = "pokemon-nickname"
      pokemonModalTitle.innerText = pokemon.species
      pokemonImage.src = pokemon.image
      pokemonNicknameFormButton.innerText = "Update Nickname"
      pokemonNicknameFormButton.classList.add("pokemonshow-form-btn")

      pokemonInfo.append(pokemonNicknameFormButton, pokemonNickname,pokemonAbility, pokemonType, pokemonNature)
      pokemonModalHeader.append(pokemonModalTitle, pokemonImage, pokemonInfo, releaseButton)
      pokemonDiv.appendChild(pokemonModalHeader)
      pokemonModalContent.appendChild(pokemonDiv)
      pokemonModal.appendChild(pokemonModalContent)

      //add release event listener
      releaseButton.addEventListener("click", pokemon.releasePokemon)
      pokemonNicknameFormButton.addEventListener('click', pokemon.createNicknameForm.bind(pokemon))
    })
    document.body.appendChild(pokemonModal)
  }
}



  createMyPokemonObjects(event) {
    let trainerId = this.id
    fetch(`http://localhost:3000/trainer_pokemons`)
    .then(resp => resp.json())
    .then(pokemons => pokemons.forEach(pokemon => {
      if (pokemon.trainer_id === 1) {
        if (pokemon.is_shiny === true) {
          new TrainerPokemon(pokemon.id,
                            pokemon.nickname,
                            pokemon.pokemon.species,
                            pokemon.nature,
                            pokemon.pokemon.type_1,
                            pokemon.pokemon.type_2,
                            pokemon.pokemon.ability,
                            pokemon.pokemon.shiny_sprite)
        }
        else{
        new TrainerPokemon(pokemon.id,
                          pokemon.nickname,
                          pokemon.pokemon.species,
                          pokemon.nature,
                          pokemon.pokemon.type_1,
                          pokemon.pokemon.type_2,
                          pokemon.pokemon.ability,
                          pokemon.pokemon.sprite_image)
        }
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
