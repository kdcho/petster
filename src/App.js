import React, { useState, useEffect } from 'react'
import GlobalStyle from './styles/GlobalStyle'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Gallery from './Gallery.js'
import AnimalProfile from './AnimalProfile'

function App() {
  const [animal, setAnimal] = useState({})
  let localData = {}
  try {
     localData = JSON.parse(localStorage.animal)
     console.log('tri', localData)
  } catch (error) {
    localData = {}
    console.error('Fehler: ', error.message)
  }
  
  const database = require('./database.json')
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Gallery database={database} handleAnimal={handleAnimal} />
        </Route>
        <Route path="/animalprofile/*">
          <AnimalProfile animal={!animal || localData} />
        </Route>
      </Switch>

      <nav>
        <Link to="/">Gallery</Link>
        <Link to="/animalprofile">AnimalProfile</Link>
      </nav>
    </Router>
  )

  function handleAnimal(animal) {
    setAnimal(animal)
    localStorage.animal = JSON.stringify(animal)
  }
}

export default App
