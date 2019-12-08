import React, { useState } from 'react'
import GlobalStyle from './styles/GlobalStyle'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Gallery from './pages/Gallery'
import AnimalProfile from './pages/AnimalProfile'
import UserProfile from './pages/UserProfile'

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
  const database = require('./dog_database.json')
  const userDatabase = require('./user_database.json')

  let animalDataFromStorage = JSON.parse(localStorage.animal || {})
  //let userDataFromStorage = JSON.parse(localStorage.user || {})
  const [animal, setAnimal] = useState(animalDataFromStorage)
  const [user, setUser] = useState(animalDataFromStorage)
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
            animal={!animal || animalDataFromStorage}
            handleSideNav={handleSideNav}
            sideNavOpen={sideNavOpen}
          />
        </Route>
        <Route path="/profile/">
          <UserProfile
            user={userDatabase[0]}
            handleUser={handleUser}
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
  function handleUser(user) {
    setUser(user)
    localStorage.user = JSON.stringify(user)
  }

  function handleSideNav() {
    setSideNavOpen(!sideNavOpen)
  }
}
