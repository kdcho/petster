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
    display: modal ? 'block' : 'none',
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
    handleScroll()
  }

  function handleScroll() {
    const scrollPos = window.scrollY
    if (!modal) {
      document.body.style.overflowY ='hidden'
      console.log(scrollPos)
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.overflowY =''
      window.scrollTo(0, scrollPos)
      console.log(scrollPos)
    }
  }
}

export default App

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 10px;
`
