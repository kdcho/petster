import React, { useState } from 'react'
import GlobalStyle from './styles/GlobalStyle'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Gallery from './Gallery.js'
import AnimalProfile from './AnimalProfile'

function App() {
  let dataFromStorage = JSON.parse(localStorage.animal || {})
  const [animal, setAnimal] = useState(dataFromStorage)

  const database = require('./database.json')
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Gallery database={database} handleAnimal={handleAnimal} />
        </Route>
        <Route path="/animalprofile/*">
            <AnimalProfile animal={!animal || dataFromStorage} />
        </Route>
      </Switch>
    </Router>
  )

  function handleAnimal(animal) {
    setAnimal(animal)
    localStorage.animal = JSON.stringify(animal)
  }
}

export default App
