import React, { useState } from 'react'
import GlobalStyle from './styles/GlobalStyle'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Gallery from './Gallery.js'
import AnimalProfile from './AnimalProfile'

function App() {
  const [animal, setAnimal] = useState(JSON.parse(localStorage.animal) || {})
  const database = require('./database.json')
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Gallery database={database} handleAnimal={handleAnimal} />
        </Route>
        <Route path="/animalprofile/*">
          <AnimalProfile animal={animal} />
        </Route>
      </Switch>

      <nav>
        <Link to="/">Gallery</Link>
        <Link to="/animalprofile">AnimalProfile</Link>
      </nav>
    </Router>
  )
  function handleAnimal(animal) {
    setAnimal(animal === {} ? JSON.parse(localStorage.animal) : animal)
    localStorage.animal = JSON.stringify(animal)
  }
}

export default App
