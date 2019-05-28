class Nature {
  constructor(nature) {
    this.name = nature.name
    Nature.all.push(this)
  }

  static all = []

  static fetchNatures() {
    fetch("http://localhost:3000/natures")
    .then(response => response.json())
    .then(natures => natures.forEach(nature => {
      let natureInstance = new Nature(nature)
    }))
  }
}
