import React, { useState } from 'react'
import Profile from './Profile.js'
import GlobalStyle from './styles/GlobalStyle'
import styled from 'styled-components/macro'
import Modal from './components/Modal.js'
import { useSpring, animated } from 'react-spring'

function App() {
  const database = require('./database.json')
  const AnimatedModal = animated(Modal)

  const [modal, setModal] = useState(false)
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    opacity: modal ? 1 : 0,
    config: { duration: 200 }
  })

  return (
    <>
      <GlobalStyle />
      <AnimatedModal
        onClick={() => handleModal()}
        style={props}
        active={modal}
      ></AnimatedModal>
      <ProfileContainer>
        {database.map(profile => (
          <Profile
            key={profile._id}
            handleModal={() => handleModal()}
            {...profile}
          />
        ))}
      </ProfileContainer>
    </>
  )

  function handleModal() {
    setModal(!modal)
  }
}

export default App

const ProfileContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 20px;
`
