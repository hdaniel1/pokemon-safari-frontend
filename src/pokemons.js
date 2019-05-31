class Pokemon {
  //pokemon object instance constructor
  constructor(id, species, type_1, type_2, ability, sprite_image, shiny) {
    this.id = id
    this.species = species
    this.type_1 = type_1
    this.type_2 = type_2
    this.ability = ability
    this.sprite_image = sprite_image
    this.shiny = shiny
    Pokemon.all.push(this)
  }
  //show wild pokemon info in modal box
  showInfo(event) {
    //set wild pokemon music
    document.querySelector("#audio").src = "assets/pokemon_battle.mp3"
    //fetch modal elements from base HTML and set visible
    let modal = document.querySelector(".bg-modal-pokemon-info")
    let pokemonModalHeader = document.querySelector(".bg-modal-title")
    let pokemonModalList = document.querySelector(".pokemon-info")
    let pokemonModalImage = document.querySelector(".bg-modal-image")
    let pokemonSpecies = document.createElement("h4")
    document.querySelector('.close').style.visibility = "visible"
    //set close button event
    document.querySelector('.close').addEventListener("click", function() {
       document.querySelector("#audio").src = document.querySelector("body").dataset.music
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
    pokemonSpecies.innerText = `A WILD ${this.species.toUpperCase()} APPEARED!`
    pokemonLiAbility.innerHTML= `Ability: ${this.ability}`
    pokemonLiType1.innerHTML = this.type_2 ? `Type 1: ${this.type_1}/${this.type_2}` : `Type 1: ${this.type_1}`
    catchButton.innerText = "Catch this Pokemon!"
    catchButton.classList.add("pokemonshow-form-btn")
    pokemonModalImage.src = this.sprite_image
    if (this.shiny = "true") {
      modal.style.animation = "slide 1s infinite 3s"
      // modal.style.transform = "translateX(100%)"
    }

    //append modal elements
    pokemonModalHeader.prepend(pokemonSpecies, pokemonModalImage)
    pokemonModalList.append(pokemonLiAbility, pokemonLiType1, pokemonLiType2, pokemonNature, catchButton)

    //add event listener for catching
    catchButton.addEventListener("click", this.catchPokemon.bind(this))
  }
  //assign a random nature to a pokemon object instance
  assignNature() {
    var nature = Nature.all[Math.floor(Math.random() * Nature.all.length)];
    this.nature = nature.name
  }
  //add a trainerpokemon instance for a pokemon to the logged in trainer
  catchPokemon(e){
    //set music to caught theme
    document.querySelector("#audio").src = "assets/caught_theme.mp3"
    //get the trainer and pokemon info
    let trainer = Trainer.all[0]
    let pokemon = this
    let data = {
      trainer_id: trainer.id,
      pokemon_id:pokemon.id,
      nature:pokemon.nature,
      is_shiny:pokemon.shiny
    }
    //make fetch post request to DB
    fetch("http://localhost:3000/trainer_pokemons", {
      method: "POST",
      headers: {
        "content-type":"application/json",
        "accepts": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(pokemon =>  {
              alert("Successfully Caught!")
              e.target.remove()
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
    )
  }
  //render pokemon object to DOM
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
  //fetch pokemon objects by type and render to DOM
  static fetchType(type) {
    return fetch(`http://localhost:3000/pokemons?type=${type}`)
    .then(response => response.json())
    .then(pokemons => {
        pokemons.forEach(pokemon => {
          //35% chance for shiny
          if ((Math.random() * 100) < 35) {
            let pokemonInstance = new Pokemon(pokemon.id, pokemon.species, pokemon.type_1, pokemon.type_2, pokemon.ability, pokemon.shiny_sprite, "true")
            pokemonInstance.render()
          }
          else {
            let pokemonInstance = new Pokemon(pokemon.id, pokemon.species, pokemon.type_1, pokemon.type_2, pokemon.ability, pokemon.sprite_image, "false")
            pokemonInstance.render()
          }
    })
        return Pokemon.all})
  }
  //fetch random pokemon regardless of type and render to DOM
  static fetchPokemon(){
    return fetch("http://localhost:3000/pokemons")
    .then(response => response.json())
    .then(pokemons => {
        pokemons.forEach(pokemon => {
          //35% chance for shiny
          if ((Math.random() * 100) < 35) {
            let pokemonInstance = new Pokemon(pokemon.id, pokemon.species, pokemon.type_1, pokemon.type_2, pokemon.ability, pokemon.shiny_sprite, "yes")
            pokemonInstance.render()
          }
          else {
            let pokemonInstance = new Pokemon(pokemon.id, pokemon.species, pokemon.type_1, pokemon.type_2, pokemon.ability, pokemon.sprite_image, "no")
            pokemonInstance.render()
          }
    })
        return Pokemon.all})
}

  //all current pokemon objects
  static all = []
}
