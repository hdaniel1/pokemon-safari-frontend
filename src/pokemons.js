class Pokemon {
  constructor(pokemon) {
    this.id = pokemon.id
    this.species = pokemon.species
    this.type_1 = pokemon.type_1
    this.type_2 = pokemon.type_2
    this.ability = pokemon.ability
    this.sprite_image = pokemon.sprite_image
    Pokemon.all.push(this)
  }

  showInfo(event) {
    let modal = document.querySelector(".bg-modal-pokemon-info")
    let pokemonModalHeader = document.querySelector(".bg-modal-title")
    let pokemonModalList = document.querySelector(".pokemon-info")
    let pokemonModalImage = document.querySelector(".bg-modal-image")
    let pokemonSpecies = document.createElement("h4")

    document.querySelector('.close').addEventListener("click", function() {
       document.querySelector('.bg-modal-pokemon-info').style.display = "none";
    });


    //create modal elements
    let pokemonLiAbility = document.createElement('li')
    let pokemonLiType1 = document.createElement('li')
    let pokemonLiType2 = document.createElement('li')
    let pokemonNature = document.createElement("li")
    let catchButton = document.createElement('button')
    //add modal element info
    pokemonNature.innerText = `Nature: ${this.nature}`
    pokemonModalHeader.innerHTML = ""
    pokemonModalList.innerHTML = ""
    modal.style.display = "flex"
    pokemonSpecies.innerText = this.species.toUpperCase()
    pokemonLiAbility.innerHTML= `Ability: ${this.ability}`
    pokemonLiType1.innerHTML = `Type 1: ${this.type_1}/${this.type_2}`
    catchButton.innerText = "Catch this Pokemon!"
    pokemonModalImage.src = this.sprite_image
    //append modal elements
    pokemonModalHeader.prepend(pokemonSpecies, pokemonModalImage)
    pokemonModalList.append(pokemonLiAbility, pokemonLiType1, pokemonLiType2, pokemonNature, catchButton)
    //add event listener for catching
    catchButton.addEventListener("click", this.catchPokemon.bind(this))
  }

  assignNature() {
    var nature = Nature.all[Math.floor(Math.random() * Nature.all.length)];
    this.nature = nature.name
  }

  catchPokemon(e){
    // console.log(e.target)
    // fetch()
    let trainer = Trainer.all[0]
    let pokemon = this
    let data = {
      trainer_id: trainer.id,
      pokemon_id:pokemon.id,
      nature:pokemon.nature
    }
    fetch("http://localhost:3000/trainer_pokemons", {
      method: "POST",
      headers: {
        "content-type":"application/json",
        "accepts": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(pokemon => new TrainerPokemon(pokemon.id,
                                        pokemon.nickname,
                                        pokemon.pokemon.species,
                                        pokemon.nature,
                                        pokemon.pokemon.type_1,
                                        pokemon.pokemon.type_2,
                                        pokemon.pokemon.ability,
                                        pokemon.pokemon.sprite_image))
  }

  render(event) {
    let pokemonContainer = document.querySelector("#pokemon_container")
    //create the elements
    let pokemonDiv = document.createElement("div")
    let pokemonSprite = document.createElement("img")
    //add element info
    pokemonSprite.src = this.sprite_image
    pokemonSprite.classList.add("pokemon-sprite")
    pokemonSprite.dataset.pokemondId = this.id
    //append elements to the dom
    pokemonDiv.appendChild(pokemonSprite)
    pokemonContainer.appendChild(pokemonDiv)
    //add event listener to the pokemon
    pokemonDiv.addEventListener("click", this.showInfo.bind(this))
  }


  static fetchPokemon(){
    fetch("http://localhost:3000/pokemons")
    .then(response => response.json())
    .then(pokemons => pokemons.forEach(pokemon => {
        let pokemonInstance = new Pokemon(pokemon)
        pokemonInstance.render()
    }))
  }

  static all = []
}
