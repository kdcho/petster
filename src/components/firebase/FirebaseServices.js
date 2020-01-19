import * as firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './FirebaseConfig'

firebase.initializeApp(firebaseConfig)
let db = firebase.firestore()

export function getAnimals() {
  let animalArr = []
  return db.collection('dogs')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        let animalObj = doc.data()
        animalObj._id = doc.id
        animalArr = [...animalArr, animalObj]
        return animalArr
      })
    })
}
