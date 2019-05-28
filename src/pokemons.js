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
    document.querySelector('.close').addEventListener("click", function() {
       document.querySelector('.modal').style.display = "none";
    });

    let modal = document.querySelector(".modal")
    let pokemonModalHeader = document.querySelector(".modal-title")
    let pokemonModalList = document.querySelector(".pokemon-info")
    let pokemonModalImage = document.querySelector(".modal-image")
    pokemonModalHeader.innerHTML = ""
    pokemonModalList.innerHTML = ""
    //create modal elements
    let pokemonLiAbility = document.createElement('li')
    let pokemonLiType1 = document.createElement('li')
    let pokemonLiType2 = document.createElement('li')
    let catchButton = document.createElement('button')
    //add modal element info
    pokemonModalHeader.innerText = this.species
    pokemonLiAbility.innerHTML= `ABILITY: ${this.ability}`
    pokemonLiType1.innerHTML = `TYPE 1: ${this.type_1}`
    pokemonLiType2.innerHTML = `TYPE 2: ${this.type_2}`
    catchButton.innerText = "Catch this Pokemon"
    modal.style.display = "block"
    pokemonModalImage.src = this.sprite_image
    //append modal elements
    pokemonModalHeader.prepend(pokemonModalImage)
    pokemonModalList.append(pokemonLiAbility, pokemonLiType1, pokemonLiType2, catchButton)
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
    debugger
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
