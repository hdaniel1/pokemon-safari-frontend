class TrainerPokemon {
  constructor(trainerPokemon) {
    this.pokemon_id = trainerPokemon.trainer_id
    this.trainer_id = trainerPokemon.pokemon_id
    this.nickname = trainerPokemon.nickname
    this.id = trainerPokemon.id
    TrainerPokemon.all.push(this)
  }

  static all = []
}
