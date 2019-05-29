class TrainerPokemon {
  constructor(id, nickname, species, nature, type_1, type_2, ability, image) {
    this.id = id
    this.nickname = nickname
    this.species = species
    this.nature = nature
    this.type_1 = type_1
    this.type_2 = type_2
    this.ability = ability
    this.image = image
    TrainerPokemon.all.push(this)
  }

  releasePokemon(event) {
    let id = event.target.dataset.id
    fetch(`http://localhost:3000/trainer_pokemons/${id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(json => event.target.parentNode.parentNode.remove())


  }

  static all = []
}
