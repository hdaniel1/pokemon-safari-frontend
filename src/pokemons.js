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

  render(event) {
    let pokemonContainer = document.querySelector("#pokemon_container")
    //create the elements
    let pokemonDiv = document.createElement("div")
    let pokemonSprite = document.createElement("img")
    let pokemonModal = document.createElement("div")
    //add element info
    pokemonSprite.src = this.sprite_image
    pokemonSprite.classList.add("pokemon-sprite")
    // pokemonSprite.classList.add("circle")
    pokemonSprite.dataset.pokemondId = this.id
    pokemonSprite.dataset.nature = this.nature
    pokemonModal.innerText = "TEST"
    pokemonModal.classList.add("modal")
    //append elements to the dom
    pokemonDiv.appendChild(pokemonSprite)
    pokemonContainer.appendChild(pokemonDiv)
    pokemonDiv.appendChild(pokemonModal)
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
