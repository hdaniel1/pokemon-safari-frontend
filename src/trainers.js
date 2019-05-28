class Trainer{
  constructor(trainer){
    this.id = trainer.id
    this.name = trainer.name
    this.username = trainer.username
    Trainer.all.push(this)
  }

  seeMyPokemon() {
    document.querySelector('.bg-modal').style.display = "flex";
    document.querySelector('.close').addEventListener("click", function() {
	     document.querySelector('.bg-modal').style.display = "";
    });

    TrainerPokemon.all.forEach(pokemon => {
      //create elements
      let pokemonDiv = document.createElement("div")
      let pokemonInfoDiv = document.createElement("div")
      let pokemonImage = document.createElement("img")
      let pokemonListInfo = document.createElement("ul")
      let pokemonSpeciesInfo = document.createElement("li")
      let pokemonAbility = document.createElement("li")
      let pokemonType1 = document.createElement("li")
      let pokemonType2 = document.createElement("li")
      let pokemonInvisibleDiv = document.createElement("div")
      let pokemonButtonDiv = document.createElement("div")
      let releaseButton = document.createElement("button")
      //add element info
      pokemonButtonDiv.classList.add("release-button-div")
      releaseButton.classList.add("release-button")
      releaseButton.dataset.pokemonId = pokemon.id
      releaseButton.innerText = "Release Pokemon"
      pokemonInfoDiv.classList.add("pokemon-info")
      pokemonInvisibleDiv.classList.add("pokemon-invis")
      pokemonSpeciesInfo.innerText = `Species: ${pokemon.species}`
      pokemonAbility.innerText = `Ability: ${pokemon.ability}`
      pokemonType1.innerText = `Type: ${pokemon.type_1}/${pokemon.type_2}`
      pokemonImage.src = pokemon.image_url
      pokemonImage.classList.add("my-pokemon")
      pokemonListInfo.append(pokemonSpeciesInfo, pokemonAbility, pokemonType1, pokemonType2)
      pokemonInfoDiv.appendChild(pokemonListInfo)
      pokemonButtonDiv.appendChild(releaseButton)
      pokemonDiv.appendChild(pokemonImage)
      document.querySelector(".modal-contents").append(pokemonDiv, pokemonInfoDiv, pokemonInvisibleDiv, pokemonButtonDiv)
      //add event listener for release
      releaseButton.addEventListener("click", )
    })

  }

  createMyPokemonObjects(event) {
    let trainerId = this.id
    fetch(`http://localhost:3000/trainers/${trainerId}`)
    .then(resp => resp.json())
    .then(trainer => trainer.trainer_pokemons.forEach(pokemon => {
      let trainerPokemonInstance = new TrainerPokemon(pokemon)
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
