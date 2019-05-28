class Trainer{
  constructor(trainer){
    this.id = trainer.id
    this.name = trainer.name
    this.username = trainer.username
    Trainer.all.push(this)
  }

  static fetchTrainers(){
    fetch("http://localhost:3000/trainers/1")
    .then(resp => resp.json())
    .then(trainer => {
      new Trainer(trainer)
    })
  }


  static all = []
}
