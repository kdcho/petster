import React from 'react'
import styled, { keyframes } from 'styled-components/macro'
import { Link } from 'react-router-dom'

import background from '../img/background_x667.jpg'
import backgroundBlurred from '../img/background_x667_blurred.jpg'

export default function PostAd({ firebase }) {
  return (
    <LoginWrapper>
      <BackgroundImgWrapper>
        <img src={background} alt="background" />
        <img src={backgroundBlurred} alt="" />
      </BackgroundImgWrapper>
      <NavigationWrapper to={'/'}>
        <i className="fas fa-arrow-left"></i>
      </NavigationWrapper>
      <LoginForm onSubmit={event => login(event)}>
        <h1>Login</h1>
        <p>
          <label htmlFor="email">EMAIL ADRESSE</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="meine@email.de"
            required
          ></input>
        </p>
        <p>
          <label htmlFor="password">PASSWORT</label>
          <input id="password" name="password" type="password" required></input>
        </p>
        <BtnWrapper>
          <LoginBtn type="submit" value="EINLOGGEN" />
          <LinkToRecovery to={'/login'}>
            <InputBtn type="button" value="Passwort vergessen?" />
          </LinkToRecovery>
          <LinkToRegister to={'/register'}>
            <StickyInputBtn
              type="button"
              value="Kein Account? Zur Registrierung"
            />
          </LinkToRegister>
        </BtnWrapper>
      </LoginForm>
    </LoginWrapper>
  )

  function login(event) {
    event.preventDefault()
    const newUser = Object.fromEntries(new FormData(event.target))

    let docData = {
      isActive: true,
      karma: 0,
      age: newUser.age,
      username: newUser.username,
      registered: firebase.firestore.Timestamp.fromDate(new Date()),
      email: newUser.email,
      password: newUser.password,
      about: newUser.about || '',
      profilePicture: 'https://i.imgur.com/QZKASj1.jpg'
    }

    let db = firebase.firestore()
    db.collection('users')
      .add(docData)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch(function(error) {
        console.error('Error adding document: ', error)
      })

    event.target.reset()
  }
}

const blur = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}`

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

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
    color: #fff;
    font-size: 32px;
  }
`

const LoginForm = styled.form`
  display: grid;
  width: 100%;
  padding: 10px 50px 10px 50px;
  color: white;
  font-family: inherit;
  font-weight: 400;
  font-size: 14px;
  animation: ${blur} 0.8s ease-in;

  h1 {
    font-size: 36px;
    font-weight: 300;
    margin-bottom: 20px;
  }

  input[type='text'],
  [type='number'],
  [type='email'],
  [type='password'] {
    color: white;
    width: 100%;
    border: 0;
    border-bottom: 2px solid lightgray;
    outline: 0;
    background: transparent;
    padding: 12px 0;
    text-align: left;
    font-size: 14px;
    line-height: 17px;
    :focus {
      border-image: linear-gradient(to right, #99ddfc, #f1919b);
      border-image-slice: 1;
    }
  }

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`
const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`

const LoginBtn = styled.input`
  font-family: inherit;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  color: #ecf0f1;
  margin: 14px 0;
  padding: 8px 0;
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

const InputBtn = styled.input`
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  border: none;
  color: #ecf0f1;
  margin: 20px 0;
  background: transparent;
  cursor: pointer;
`

const StickyInputBtn = styled(InputBtn)`
  position: absolute;
  background: #2c2b2b2b;
  padding: 14px;
  margin: 0;
  left: 0;
  bottom: 0;
`

const LinkToRecovery = styled(Link)`
  text-decoration: none;
`

const LinkToRegister = styled(Link)`
  text-decoration: none;
`
