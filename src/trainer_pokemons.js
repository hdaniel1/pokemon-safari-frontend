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

    adjustContent(e){
      if(e.target.value.length === 0){
        e.target.setAttribute("size", "12")
      }else{
        e.target.style.width = ((e.target.value.length + 1) * 8) + 'px';
      }
    }

    createNicknameForm(e){
      //create the form in the DOM
      let pokemonNicknameForm = document.createElement("form")
      let pokemonNicknameDiv = document.createElement("div")
      let pokemonNicknameInput = document.createElement("input")
      let pokemonUpdateButton = document.createElement("input")

      pokemonNicknameInput.type = "text"
      pokemonNicknameInput.placeholder = "Change Nickname"
      pokemonUpdateButton.type = "submit"

      pokemonNicknameForm.append(pokemonNicknameInput, pokemonUpdateButton)
      pokemonNicknameDiv.appendChild(pokemonNicknameForm)
      event.target.parentNode.prepend(pokemonNicknameDiv)

      pokemonNicknameForm.addEventListener("submit", this.updatePokemonNickname.bind(this))
    }

    updatePokemonNickname(event) {
        // [data-text-id='${id}']
        let nickname = event.target.querySelector("input").value
        let data = {
          nickname : nickname
        }
        fetch(`http://localhost:3000/trainer_pokemons/${this.id}`,{
          method: "PATCH",
          headers:{
            "content-type" : "application/json",
            "accepts" : "application/json"
          },
          body:JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(jsonData => {
          if(jsonData){
            document.querySelector("#audio").src = "assets/pokedex_theme.mp3"
            let pokemonObject = TrainerPokemon.all.find(pokemon => pokemon.id == jsonData.id)
            pokemonObject.nickname = nickname
            document.querySelector("#pokemon-nickname").innerText = `Nickname: ${nickname}`
              alert("Updated Successfully!!!")
          }
          else{
            alert("Sorry, there was an error updating pokemon nickname.")
          }
        })

    }

  static all = []
}
