import React from 'react'
import styled, { keyframes } from 'styled-components/macro'
import { Link, Route, Redirect } from 'react-router-dom'

import background from '../img/background_x667.jpg'
import backgroundBlurred from '../img/background_x667_blurred.jpg'

export default function Registration({ firebase, handleLoggedIn, loggedIn }) {
  return (
    <RegisterWrapper>
      <BackgroundImgWrapper>
        <img src={background} alt="background" />
        <img src={backgroundBlurred} alt="" />
      </BackgroundImgWrapper>
      <NavigationWrapper to={'/'}>
        <i className="fas fa-arrow-left"></i>
      </NavigationWrapper>
      <RegisterForm onSubmit={event => handleRegisterUser(event)}>
        <h1>Registrierung</h1>
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
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength="6"
          ></input>
        </p>
        <BtnWrapper>
          <RegisterBtn type="submit" value="REGISTRIEREN" />
          <LinkToLogin to={'/login'}>
            <MemberBtn type="button" value="Bereits registriert?" />
          </LinkToLogin>
        </BtnWrapper>
      </RegisterForm>
      <Route>{loggedIn ? <Redirect to="/" /> : ''}</Route>
    </RegisterWrapper>
  )

  function handleRegisterUser(event) {
    event.preventDefault()
    const newUser = Object.fromEntries(new FormData(event.target))
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(function(response) {
        if (newUser.email === response.user.email) {
          const user = firebase.auth().currentUser
          user
            .sendEmailVerification()
            .then(function() {
              handleLoggedIn()
            })
            .catch(function(error) {
              console.log('Verification Error: ' + error)
            })
        }
      })
      .catch(function(error) {
        console.log(error.code + ': ' + error.message)
        if (error.Code === 'auth/weak-password') {
          alert('The password is too weak.')
        }
        handleEmailAlreadyExists(error.Code)
      })

    event.target.reset()
  }
  function handleEmailAlreadyExists(errorCode) {
    if (errorCode.includes('auth/email-already-in-use')) {
      const emailField = document.querySelector("[id='email']")
      emailField.setCustomValidity('Email already in use.')
    }
  }
}

const blur = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}`

const RegisterWrapper = styled.div`
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

const RegisterForm = styled.form`
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
`
const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`

const RegisterBtn = styled.input`
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
const LinkToLogin = styled(Link)`
  text-decoration: none;
`

const MemberBtn = styled.input`
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  border: none;
  color: #ecf0f1;
  margin: 14px 0;
  background: transparent;
  text-align: center;
  cursor: pointer;
`
