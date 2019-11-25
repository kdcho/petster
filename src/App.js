import React, { useState } from 'react'
import Profile from './Profile.js'
import GlobalStyle from './styles/GlobalStyle'
import styled from 'styled-components/macro'
import Modal from './components/Modal.js'

function App() {
  const database = require('./database.json')
  console.log(database)

  const [modal, setModal] = useState(false)

  return (
    <>
      <GlobalStyle />
      <Modal onClick={() => handleModal()} active={modal} />
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
