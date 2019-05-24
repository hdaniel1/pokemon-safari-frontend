class Pokemon {
  constructor(pokemon) {
    this.id = pokemon.id
    this.species = pokemon.species
    this.type_1 = pokemon.type_1
    this.type_2 = pokemon.type_2
    this.ability = pokemon.ability
    this.nature = pokemon.nature
    this.sprite_image = pokemon.sprite_image
  }

  showInfo(event) {
    let pokemonSpecies = this.species
    let pokemonAbility = this.ability
    let pokemonTypes = []
    pokemonTypes.push(this.type_1, this.type_2)

    debugger
  }
  render(event) {
    let pokemonContainer = document.querySelector("#pokemon_container")
    //create the elements
    let pokemonDiv = document.createElement("div")
    let pokemonSprite = document.createElement("img")
    //add element info
    pokemonSprite.src = this.sprite_image
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
}
