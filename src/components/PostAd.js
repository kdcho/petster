import React from 'react'
import styled, { keyframes } from 'styled-components/macro'
import Search from '../components/Search'

import background from '../img/background_x667.jpg'
import backgroundBlurred from '../img/background_x667_blurred.jpg'

export default function PostAd() {
  return (
    <>
      <BackgroundImgWrapper>
        <img src={background} alt="background" />
        <img src={backgroundBlurred} alt="" />
      </BackgroundImgWrapper>
      <NavigationWrapper>
        <i class="fas fa-arrow-left"></i>
      </NavigationWrapper>
      <PostAdForm>
        <h1>Neuen Hund hinzufügen</h1>
        <p>
          <label htmlFor="name">NAME</label>
          <input id="name" name="name" type="text" required />
        </p>
        <p>
          <label htmlFor="age">ALTER</label>
          <input id="age" name="age" type="number" required />
        </p>
        <p>
          <label id="age" htmlFor="age-format-w">
            <i />
            IN WOCHEN
          </label>
          <input
            id="age-format-w"
            name="age-format"
            type="radio"
            value="weeks"
            defaultChecked
          />
          <label id="age" htmlFor="age-format-y">
            IN JAHREN
          </label>
          <input
            id="age-format-y"
            name="age-format"
            type="radio"
            value="years"
          />
        </p>
        <p>
          <label htmlFor="gender">MÄNNLICH</label>
          <input
            id="gender"
            name="gender"
            type="radio"
            value="Männlich"
            defaultChecked
            required
          />
          <label htmlFor="gender">WEIBLICH</label>
          <input id="gender" name="gender" type="radio" required />
        </p>
        <div>
          <label htmlFor="breed">RASSE</label>
          <SearchInput postAd />
        </div>
        <p>
          <h4>EIGENSCHAFTEN</h4>
          <label htmlFor="tags">KLEIN</label>
          <input id="tags" name="tags" type="checkbox" />
          <label htmlFor="tags">GROß</label>
          <input id="tags" name="tags" type="checkbox" />
          <label htmlFor="tags">SCHEU</label>
          <input id="tags" name="tags" type="checkbox" />
          <label htmlFor="tags">AUSDAUERND</label>
          <input id="tags" name="tags" type="checkbox" />
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
        <p>
          <button value="submit">HINZUFÜGEN</button>
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
    animation: ${blur} 0.8s ease-in;
  }
`

const NavigationWrapper = styled.span`
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

  input {
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

  div {
    margin: 14px 0;
    > div {
      margin-top: 0px;
    }
    ul {
      color: black;
    }
  }

  input[type='radio'] {
    width: 20px;
  }

  input[type='checkbox'] {
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

  button {
    display: block;
    font-family: inherit;
    font-size: 14px;
    border: none;
    border-radius: 10px;
    color: #ecf0f1;
    padding: 8px;
    background: #f24e86;
    width: 100%;
    cursor: pointer;
    box-shadow: 0 0.15rem 0.15rem rgba(0, 0, 0, 0.2),
      0 0 0rem rgba(0, 0, 0, 0.2);;
    &:active,
    &:focus {
      outline: none;
    }
  }
`

const SearchInput = styled(Search)``
