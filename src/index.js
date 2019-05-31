document.addEventListener("DOMContentLoaded", loginPage)


function loginPage(e){
  let form = document.getElementsByTagName('form')[0]
  form.addEventListener('submit', loginAccess)
}

function loginAccess(e){
  e.preventDefault()
  let myForm = document.querySelector('form')
  let username = myForm.getElementsByClassName("input100")[0].value
   myForm.reset()

if(username){
   checkUserExist(username)
 }else{
   window.location.reload()
 }
}

function checkUserExist(name){

let data = {
  username : name
}

  fetch("http://localhost:3000/trainers",{
    method : "POST",
    headers : {
      "Content-Type" : "Application/json",
      "Accepts" : "Application/json"
    },
    body : JSON.stringify(data)
  })
  .then(resp => resp.json())
  .then(jsonData => {
    if(jsonData.error){
      alert(jsonData.error)
    }else{
     console.log(jsonData)
    document.querySelector('.limiter').style.display = "none"
    document.querySelector('.navbar').style.display = "block"
    document.querySelector('main').style.display = "block"
    init()
  }
  })
}



function init(){
  setTimeout(function(){
    Pokemon.all.forEach(pokemon => pokemon.assignNature()); }, 3000);

    let logout = document.querySelector('#logout')
    logout.addEventListener('click', logOut)

      // logOut()

  // let promise1 = Promise.resolve(Pokemon.all)
   Promise.all([Pokemon.fetchPokemon(), Nature.fetchNatures(), Trainer.fetchTrainers()])

  //shuffle current pokemon based on type
  document.querySelector("#shuffle").addEventListener("click", function() {

    if (document.body.className) {
    document.querySelector(".dropbtn").innerText = document.body.className
    Pokemon.all = []
    document.querySelector("#pokemon_container").innerHTML = ""
    Pokemon.fetchType(document.querySelector("body").className)
    }
    else {
      Pokemon.all = []
      document.querySelector("#pokemon_container").innerHTML = ""
      Pokemon.fetchPokemon()
    }
  })
  //change pokemon by type
  document.querySelectorAll(".pokemon-type").forEach(type => {
    type.addEventListener("click", function(){
      document.querySelector("#audio").src = event.target.dataset.music
      document.querySelector("body").dataset.music = event.target.dataset.music
      document.body.classList = ""
      document.body.classList.add(event.target.innerText)
      document.querySelector(".dropbtn").innerText = event.target.innerText
      Pokemon.all = []
      document.querySelector("#pokemon_container").innerHTML = ""
      Pokemon.fetchType(event.target.innerText)
    })
  })
}

function logOut(){
  document.querySelector('.limiter').style.display = "block"
  document.querySelector('.navbar').style.display = "none"
  document.querySelector('main').style.display = "none"
}
