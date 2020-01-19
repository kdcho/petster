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
import PostAd from './pages/PostAd'
import Registration from './pages/Registration'
import Login from './pages/Login'

firebase.initializeApp(firebaseConfig)

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET

export default function App() {
  const [loggedIn, setLoggedin] = useState()
  const [animalList, setAnimalList] = useState([])
  const [image, setImage] = useState('')

  const [currentAnimal, setCurrentAnimal] = useState()
  const [currentUser, setCurrentUser] = useState({})
  const [sideNavOpen, setSideNavOpen] = useState(false)

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
  }, [])

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setLoggedin(true)

        let db = firebase.firestore()
        db.collection('users')
          .doc(user.uid)
          .get()
          .then(function(userData) {
            if (userData.exists) {
              setCurrentUser(userData.data())
            } else {
              console.log(user.uid, `User doesn't exist.`)
            }
          })
      } else {
        setLoggedin(false)
      }
    })
  }, [loggedIn])

  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/gallery/">
          <Gallery
            loggedIn={loggedIn}
            handleAnimal={handleAnimal}
            handleSideNav={handleSideNav}
            sideNavOpen={sideNavOpen}
            animalList={animalList}
            handleSignOut={handleSignOut}
          />
        </Route>
        <Route path="/animalprofile/*">
          <AnimalProfile animal={currentAnimal} />
        </Route>
        <Route path="/profile/">
          <UserProfile
            user={currentUser}
            image={image}
            upload={event => uploadImage(event)}
            loggedIn={loggedIn}
          />
        </Route>
        <Route path="/postad/">
          <PostAd firebase={firebase} loggedIn={loggedIn} />
        </Route>
        <Route path="/register/">
          <Registration firebase={firebase} loggedIn={loggedIn} />
        </Route>
        <Route path="/login/">
          <Login firebase={firebase} loggedIn={loggedIn} />
        </Route>
      </Switch>
    </Router>
  )

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

  function handleAnimal(currentAnimal) {
    setCurrentAnimal(currentAnimal)
  }

  function handleSideNav() {
    setSideNavOpen(!sideNavOpen)
  }

  function handleSignOut() {
    firebase
      .auth()
      .signOut()
      .then(function() {})
      .catch(function(error) {
        console.error('SignOut error: ' + error)
      })
  }
}
