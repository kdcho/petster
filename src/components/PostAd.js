import React from 'react'
import styled, { keyframes } from 'styled-components/macro'
import Navigation from './Navigation'

import background from '../img/background_x667.jpg'
import backgroundBlurred from '../img/background_x667_blurred.jpg'

export default function PostAd() {
  return (
    <>
      <Navigation />
      <BackgroundImgWrapper>
        <img src={background} alt="background" />
        <img src={backgroundBlurred} alt="" />
      </BackgroundImgWrapper>
      <PostAdForm>
        <p>
          <label for="name">Name</label>
          <input id="name" name="name" type="text" />
        </p>
        <p>
          <label for="age-format"></label>
          <input id="age-format" name="age-format" type="radio" />
        </p>
        <p>
          <label for="age">Alter</label>
          <input id="age" name="age" type="number" />
        </p>
        <p>
          <label for="gender">Geschlecht</label>
          <input id="gender" name="gender" type="radio" />
        </p>
        <p>
          <label for="breed">Rasse</label>
          <input id="breed" name="breed" type="search" />
        </p>
        <p>
          <label for="tags">Tags</label>
          <input id="tags" name="tags" type="checkbox" />
        </p>
        <p>
          <label for="desc">Beschreibung</label>
          <textarea
            id="desc"
            name="desc"
            placeholder="Hier kommt die Beschreibung des Hundes hin"
          />
        </p>
        <p>
          <input type="submit" value="submit" />
        </p>
      </PostAdForm>
    </>
  )
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
    animation: ${blur} 1s ease-in;
  }
`

const PostAdForm = styled.form`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, auto);
  padding: 20px;
  p {
    grid-row: 1 / span 3;
  }
  input {
    -webkit-appearance: none;
    appearance: none;
  }
  button,
  input,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    width: 150px;
  }
  textarea {
    grid-column: 1 / span 3;
    padding: 10px;
    margin: 10px 0 0 -10px;
    width: 340px;
    height: 360px;
    resize: none;
    overflow: auto;
  }
`
