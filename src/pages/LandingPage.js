import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components/macro'
import { Route, Redirect } from 'react-router-dom'

import background from '../img/background_x667.jpg'

export default function LandingPage({ loggedIn }) {
  const [redirectPath, setRedirectPath] = useState('')
  return (
    <LPWrapper>
      <BackgroundImgWrapper>
        <img src={background} alt="background" />
      </BackgroundImgWrapper>
      <LPForm>
        <Header>
          <h1>Petster</h1>
          <p>Biete Hunden ein Zuhause</p>
        </Header>
        <BtnWrapper>
          <RegisterBtn
            onClick={event => redirect(event)}
            type="submit"
            value="REGISTRIEREN"
          ></RegisterBtn>
          <LoginBtn
            onClick={event => redirect(event)}
            type="submit"
            value="EINLOGGEN"
          />
        </BtnWrapper>
      </LPForm>
      <Route>
        <Redirect to={redirectPath}></Redirect>
      </Route>
    </LPWrapper>
  )

  function redirect(event) {
    event.preventDefault()
    if (event.target.value === 'register') {
      setRedirectPath('/register')
    } else {
      setRedirectPath('/login')
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

const LPWrapper = styled.div`
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
`
const LPForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100vh;
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
    text-align: center;
  }

  p {
    text-align: center;
  }
`

const Header = styled.div`
  justify-content: flex-start;
`

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 280px;
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
  height: 60px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 0.15rem 0.15rem rgba(0, 0, 0, 0.2), 0 0 0rem rgba(0, 0, 0, 0.2);
  &:active,
  &:focus {
    outline: none;
  }
`
const LoginBtn = styled(RegisterBtn)`
  background: #2a4755;
`
