import React, { useState } from 'react'
import GlobalStyle from './styles/GlobalStyle'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Gallery from './Gallery.js'
import AnimalProfile from './AnimalProfile'
import Search from './components/Search'

export default function App() {
  let dataFromStorage = JSON.parse(localStorage.animal || {})
  const [animal, setAnimal] = useState(dataFromStorage)
  const [sideNavOpen, setSideNavOpen] = useState(false)

  const database = require('./database.json')
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Gallery
            database={database}
            handleAnimal={handleAnimal}
            handleSideNav={handleSideNav}
            sideNavOpen={sideNavOpen}
          />
        </Route>
        <Route path="/animalprofile/*">
          <AnimalProfile
            animal={!animal || dataFromStorage}
            handleSideNav={handleSideNav}
            sideNavOpen={sideNavOpen}
          />
        </Route>
        <Route path="/search/">
          <Search />
        </Route>
      </Switch>
    </Router>
  )

  function handleAnimal(animal) {
    setAnimal(animal)
    localStorage.animal = JSON.stringify(animal)
  }

  function handleSideNav() {
    setSideNavOpen(!sideNavOpen)
  }
}
