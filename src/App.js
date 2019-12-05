import React, { useState } from 'react'
import GlobalStyle from './styles/GlobalStyle'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Gallery from './Gallery.js'
import AnimalProfile from './AnimalProfile'
import Search from './components/Search'

import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBLAQCvYLxD3DosiTj-PgUYpZocIhrorq0',
  authDomain: 'petster-app.firebaseapp.com',
  databaseURL: 'https://petster-app.firebaseio.com',
  projectId: 'petster-app',
  storageBucket: 'petster-app.appspot.com',
  messagingSenderId: '768467764431',
  appId: '1:768467764431:web:2b48031a3d9970c45d63ba'
}
firebase.initializeApp(firebaseConfig)

export default function App() {
  const database = require('./database.json')

  //let dataFromStorage = JSON.parse(localStorage.animal || {})
  const [animal, setAnimal] = useState(database)
  const [sideNavOpen, setSideNavOpen] = useState(false)

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
            animal={!animal || database}
            handleSideNav={handleSideNav}
            sideNavOpen={sideNavOpen}
          />
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
