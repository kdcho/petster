import React, { useState } from 'react'
import axios from 'axios'
import GlobalStyle from './styles/GlobalStyle'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Gallery from './pages/Gallery'
import AnimalProfile from './pages/AnimalProfile'
import UserProfile from './pages/UserProfile'
import AddAnimal from './components/AddAnimal'

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

/* let db = firebase.firestore()
db.collection("users").add({
  first: "Alan",
  last: "Turing",
  born: 1912
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
}); */

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET

export default function App() {
  const database = require('./dog_database.json')
  const userDatabase = require('./user_database.json')
  const [image, setImage] = useState('')

  let animalDataFromStorage = JSON.parse(localStorage.animal || {})
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
            image={image}
            upload={event => upload(event)}
          />
        </Route>
        <Route path="/addanimal/">
          <AddAnimal />
        </Route>
      </Switch>
    </Router>
  )

  function upload(event) {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/image/upload`

    const formData = new FormData()
    formData.append('file', event.target.files[0])
    formData.append('upload_preset', PRESET)

    axios
      .post(url, formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      })
      .then(onImageSave)
      .catch(err => console.error(err))
  }

  function onImageSave(response) {
    setImage(response.data.url)
  }

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
