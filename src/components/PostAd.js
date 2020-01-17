import React from 'react'
import styled, { keyframes } from 'styled-components/macro'
import SearchInput from '../components/Search'
import { Link } from 'react-router-dom'

import background from '../img/background_x667.jpg'
import backgroundBlurred from '../img/background_x667_blurred.jpg'

export default function PostAd({ firebase }) {
  return (
    <>
      <BackgroundImgWrapper>
        <img src={background} alt="background" />
        <img src={backgroundBlurred} alt="" />
      </BackgroundImgWrapper>
      <NavigationWrapper to={'/'}>
        <i className="fas fa-arrow-left"></i>
      </NavigationWrapper>
      <PostAdForm onSubmit={event => addAnimal(event)}>
        <h1>Hund hinzufügen</h1>
        <p>
          <label htmlFor="name">NAME</label>
          <input id="name" name="name" type="text" required minLength="3" />
        </p>
        <p>
          <label htmlFor="age">ALTER</label>
          <select name="age" id="age" required>
            <option value="jünger als 8 Wochen">jünger als 8 Wochen</option>
            <option value="älter als 8 Wochen">älter als 8 Wochen</option>
            <option value="älter als 12 Wochen">älter als 12 Wochen</option>
          </select>
        </p>
        <p>
          <label htmlFor="gender">MÄNNLICH</label>
          <input
            id="gender"
            name="gender"
            type="radio"
            value="male"
            defaultChecked
            required
          />
          <label htmlFor="gender">WEIBLICH</label>
          <input
            id="gender"
            name="gender"
            type="radio"
            value="female"
            required
          />
        </p>
        <div>
          <label htmlFor="breed">RASSE</label>
          <SearchInput postAd required />
        </div>
        <h4>EIGENSCHAFTEN</h4>
        <p>
          <label htmlFor="tags">KLEIN</label>
          <input id="tags" name="tags" type="checkbox" value="KLEIN" />
          <label htmlFor="tags">GROß</label>
          <input id="tags" name="tags" type="checkbox" value="GROß" />
          <label htmlFor="tags">SCHEU</label>
          <input id="tags" name="tags" type="checkbox" value="SCHEU" />
          <label htmlFor="tags">AUSDAUERND</label>
          <input id="tags" name="tags" type="checkbox" value="AUSDAUERND" />
        </p>
        <p>
          <label htmlFor="desc">BESCHREIBUNG</label>
          <textarea
            id="desc"
            name="desc"
            placeholder="Bitte beschreibe den Hund ein oder zwei Sätzen"
            required
          />
        </p>
        <SubmitBtn type="submit" value="HINZUFÜGEN" />
      </PostAdForm>
    </>
  )

  function addAnimal(event) {
    event.preventDefault()
    const newAnimal = Object.fromEntries(new FormData(event.target))
    newAnimal.tags = [...getTagsAsArray()]

    let docData = {
      isAvailable: true,
      age: newAnimal.age,
      name: newAnimal.name,
      gender: newAnimal.gender,
      breed: newAnimal.breed,
      registered: firebase.firestore.Timestamp.fromDate(new Date()),
      desc: newAnimal.desc,
      tags: newAnimal.tags
    }

    if (event.target) console.log('true')
    let db = firebase.firestore()
    db.collection('dogs')
      .add(docData)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch(function(error) {
        console.error('Error adding document: ', error)
      })

    event.target.form.reset()
  }

  function getTagsAsArray() {
    const tags = Array.from(
      document.querySelectorAll('[name=tags]:checked')
    ).map(tag => tag.value)
    return tags
  }
}

const blur = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}`

const BackgroundImgWrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: -1;
  object-fit: cover;
  img {
    position: absolute;
  }
  img:last-child {
    animation: ${blur} 0.8s ease-in;
  }
`

const NavigationWrapper = styled(Link)`
  & i {
    padding: 20px 20px 0 20px;
    color: #2a4755;
    font-size: 36px;
  }
`

const PostAdForm = styled.form`
  display: grid;
  width: 100vw;
  padding: 10px 50px 50px 50px;
  color: white;
  font-family: inherit;
  font-weight: 400;
  font-size: 14px;
  animation: ${blur} 1s ease-in;

  h1 {
    font-size: 36px;
    font-weight: 300;
    margin: 0 0 20px 0;
  }

  h4 {
    font-weight: 400;
    margin: 0 0 20px 0;
  }

  div {
    margin: 14px 0;
    > div {
      margin-top: 0px;
    }
    ul {
      color: black;
    }
  }

  input[type='text'] {
    color: white;
    width: 100%;
    border: 0;
    border-bottom: 2px solid lightgray;
    outline: 0;
    background: transparent;
    padding: 9px 0;
    text-align: left;
    :focus {
      border-image: linear-gradient(to right, #99ddfc, #f1919b);
      border-image-slice: 1;
    }
  }

  input[type='radio'], input[type='checkbox'] {
    width: 20px;
  }

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  textarea {
    font-family: inherit;
    padding: 10px;
    height: 160px;
    width: 100%;
    resize: none;
    overflow: auto;
    color: white;
    background: transparent;
    border: 1px solid gray;
  }

  label {
    padding-bottom: 5px;
  }

  select {
    display: block;
    margin-top: 5px;
    font-family: inherit;
  }
`
const SubmitBtn = styled.input`
  display: block;
  font-family: inherit;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  color: #ecf0f1;
  padding: 8px;
  background: #f24e86;
  width: 100%;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 0.15rem 0.15rem rgba(0, 0, 0, 0.2), 0 0 0rem rgba(0, 0, 0, 0.2);
  &:active,
  &:focus {
    outline: none;
  }
`
