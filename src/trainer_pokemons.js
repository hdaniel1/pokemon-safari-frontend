class TrainerPokemon {
  //trainerpokemon object instance constructor
  constructor(id, nickname, species, nature, type_1, type_2, ability, image, shiny) {
    this.id = id
    this.nickname = nickname
    this.species = species
    this.nature = nature
    this.type_1 = type_1
    this.type_2 = type_2
    this.ability = ability
    this.image = image
    this.is_shiny = shiny
    TrainerPokemon.all.push(this)
  }
  //remove trainerpokemon object from DOM and record from DB
  releasePokemon(event) {
    //get trainerpokemon id
    let id = event.target.dataset.id
    //fetch request to delete trainerpokemon by id
    fetch(`http://localhost:3000/trainer_pokemons/${id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(json => {
      for( var i = 0; i < TrainerPokemon.all.length; i++){
        //remove object from All class object (so it doesn't show up on re-opening "My Pokemon" without a refresh")
        if ( TrainerPokemon.all[i] === TrainerPokemon.all.find(pokemon => pokemon.id == json.id)) {
          TrainerPokemon.all.splice(i, 1);
        }
      }
      //remove the DOM element
      event.target.parentNode.parentNode.remove()})
  }
  //create the nickname form for a trainerpokemon object
    createNicknameForm(e){
      //create the form in the DOM (checking if it already exists first)
      if (!document.querySelector(`#nickname-form-${this.id}`)) {
          let pokemonNicknameForm = document.createElement("form")
          let pokemonNicknameDiv = document.createElement("div")
          let pokemonNicknameInput = document.createElement("input")
          let pokemonUpdateButton = document.createElement("input")
          //add element info / typing
          pokemonNicknameInput.type = "text"
          pokemonNicknameInput.placeholder = "Change Nickname"
          pokemonUpdateButton.type = "submit"
          pokemonNicknameForm.id = `nickname-form-${this.id}`
          //append elements to DOM
          pokemonNicknameForm.append(pokemonNicknameInput, pokemonUpdateButton)
          pokemonNicknameDiv.appendChild(pokemonNicknameForm)
          event.target.parentNode.prepend(pokemonNicknameDiv)
          //add event listener for submitting form
          pokemonNicknameForm.addEventListener("submit", this.updatePokemonNickname.bind(this))
        }
    }
    //update a trainerpokemon instance's nickname based on form submission
    updatePokemonNickname(event) {
        event.preventDefault()
        // [data-text-id='${id}']
        let nickname = event.target.querySelector("input").value
        let data = {
          nickname : nickname
        }
        //fetch patch request to DB
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
            //set music for successful update
            document.querySelector("#audio").src = "assets/pokedex_theme.mp3"
            //update trainerPokemon object instance's nickname
            TrainerPokemon.all.find(pokemon => pokemon.id == jsonData.id).nickname = nickname
            //update the DOM and alert user
            document.querySelector("#pokemon-nickname").innerText = `Nickname: ${nickname}`
              alert("Updated Successfully!!!")
          }
          else{
            alert("Sorry, there was an error updating pokemon nickname.")
          }
        })

    }
  //all trainerPokemon object instances
  static all = []
}
