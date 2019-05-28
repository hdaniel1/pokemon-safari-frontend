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
    // event.target.classList.add("modal")
    let pokemonModal = document.querySelector(".modal")
    pokemonModal.style.display = "block";


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
    let pokemonModal = document.createElement("div")
    let pokemonModalHeader = document.createElement("h3")
    let pokemonModalList = document.createElement('ul')
    let pokemonLiAbility = document.createElement('li')
    let pokemonLiType1 = document.createElement('li')
    let pokemonLiType2 = document.createElement('li')
    let catchButton = document.createElement('button')


    //add element info
    pokemonSprite.src = this.sprite_image
    pokemonSprite.classList.add("pokemon-sprite")
    // pokemonSprite.classList.add("circle")
    pokemonSprite.dataset.pokemondId = this.id
    pokemonSprite.dataset.nature = this.nature
    pokemonModal.classList.add("modal")
    pokemonModalHeader.innerText = this.species
    pokemonLiAbility.innerHTML= `ABILITY: ${this.ability}`
    pokemonLiType1.innerHTML = `TYPE 1: ${this.type_1}`
    pokemonLiType2.innerHTML = `TYPE 2: ${this.type_2}`
    catchButton.innerText = "Catch this Pokemon"
    //append elements to the dom
    pokemonDiv.appendChild(pokemonSprite)
    pokemonContainer.appendChild(pokemonDiv)
    pokemonDiv.appendChild(pokemonModal)
    pokemonModal.append(pokemonModalHeader, pokemonModalList, catchButton)
    pokemonModalList.append(pokemonLiAbility, pokemonLiType1, pokemonLiType2)

    //add event listener to the pokemon
    pokemonDiv.addEventListener("click", this.showInfo.bind(this))
    catchButton.addEventListener('click', this.catchPokemon.bind(this))
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
