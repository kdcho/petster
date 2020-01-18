import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GlobalStyle from './styles/GlobalStyle'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import firebaseConfig from './components/firebase/FirebaseConfig'
import Gallery from './pages/Gallery'
import AnimalProfile from './pages/AnimalProfile'
import UserProfile from './pages/UserProfile'
import PostAd from './components/PostAd'
import Registration from './components/Registration'
import Login from './components/Login'

firebase.initializeApp(firebaseConfig)

/* import {getAnimals} from './components/firebase/FirebaseServices' */

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET

export default function App() {
  useEffect(() => {
    let animalArr = []
    let db = firebase.firestore()
    db.collection('dogs')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let animalObj = doc.data()
          animalObj._id = doc.id
          animalArr = [...animalArr, animalObj]
          setAnimalList(animalArr)
        })
      })
    /*       getAnimals().then(setAnimalList)
      console.log(getAnimals().then(setAnimalList)) */
  }, [])

  const [loggedIn, setLoggedin] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setLoggedin(true)
      } else {
        setLoggedin(false)
      }
    })
    console.log(loggedIn)
  }, [loggedIn])

  const [animalList, setAnimalList] = useState([])

  const userDatabase = require('./user_database.json')
  const [image, setImage] = useState('')

  const [animal, setAnimal] = useState()
  const [user, setUser] = useState()
  const [sideNavOpen, setSideNavOpen] = useState(false)

  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Gallery
            loggedIn={loggedIn}
            handleAnimal={handleAnimal}
            handleSideNav={handleSideNav}
            sideNavOpen={sideNavOpen}
            animalList={animalList}
          />
        </Route>
        <Route path="/animalprofile/*">
          <AnimalProfile
            animal={!animal}
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
            upload={event => uploadImage(event)}
          />
        </Route>
        <Route path="/postad/">
          <PostAd firebase={firebase} />
        </Route>
        <Route path="/register/">
          <Registration
            firebase={firebase}
            handleLoggedIn={handleLoggedIn}
            loggedIn={loggedIn}
          />
        </Route>
        <Route path="/login/">
          <Login firebase={firebase} />
        </Route>
      </Switch>
    </Router>
  )

  function handleLoggedIn() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setLoggedin(true)
      } else {
        setLoggedin(false)
      }
    })
  }

  function uploadImage(event) {
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
