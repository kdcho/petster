import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Navigation from '../components/Navigation'
import PictureUpload from '../components/PictureUpload'

export default function UserProfile({ user, handleSideNav, sideNavOpen }) {
  const [openUpload, setOpenUpload] = useState(false)

  return (
    <Container sideNavOpen={sideNavOpen}>
      <Navigation
        userprofile
        handleSideNav={handleSideNav}
        sideNavOpen={sideNavOpen}
      />
      <Profile sideNavOpen={sideNavOpen}>
        <Header>
          <ProfilePic>
            <PicWrapper>
              <img src={user.picture} alt="profile"></img>
              <CameraOuter onClick={() => setOpenUpload(!openUpload)}>
                <CameraInner>
                  <i className="fa fa-camera" aria-hidden="true" />
                </CameraInner>
              </CameraOuter>
              <PenOuter>
                <PenInner>
                  <i className="fa fa-pen" aria-hidden="true" />
                </PenInner>
              </PenOuter>
            </PicWrapper>
          </ProfilePic>
          <Subheader>
            <Name>{user.name}</Name>
            <Karma>
              {user.karma}
              <i className="fas fa-bone" aria-hidden="true" />
            </Karma>
          </Subheader>
        </Header>
        <DetailsContainer sideNavOpen={sideNavOpen}>
          <About about={user.about}>
            {user.about ? user.about : 'Beschreibung folgt..'}
          </About>
          <Registered>
            <i className="fa fa-calendar-alt" aria-hidden="true" />
            {user.registered.substr(7, 4) < new Date().getFullYear()
              ? `Dabei seit ${user.registered}`
              : `Dabei seit ${user.registered.substr(0, 5)}`}
          </Registered>
          <Contact sideNavOpen={sideNavOpen}>
            Kontaktinformationen anzeigen
          </Contact>
        </DetailsContainer>
      </Profile>
      {openUpload ? <PictureUpload></PictureUpload> : ''}
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: #2a4755;
`

const Profile = styled.div`
  display: grid;
  grid-template-rows: 280px auto;
  width: 100%;
  transition: all 0.3s ease-in;
  position: ${props => (props.sideNavOpen ? 'fixed' : 'unset')};
  margin-left: ${props => (props.sideNavOpen ? '300px' : 'unset')};
  opacity: ${props => (props.sideNavOpen ? '0.4' : '1')};
`

const Header = styled.header`
  padding-top: 20px;
`

const ProfilePic = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  & img {
    width: 100%;
    height: auto;
    display: block;
  }
`

const PicWrapper = styled.div`
  width: 200px;
  height: 200px;
  border: 10px solid #5389a4;
  border-radius: 50%;
  overflow: hidden;
`

const CameraOuter = styled.span`
  position: absolute;
  top: 6px;
  left: 0;
  width: 52px;
  height: 52px;
  background: #5389a4b3;
  border-radius: 50%;
  cursor: pointer;
`

const CameraInner = styled.span`
  width: 40px;
  height: 40px;
  display: block;
  border-radius: 50%;
  text-align: center;
  margin: 6px auto 0px;
  background: #efefef;
  & i {
    color: #2a4755;
    font-size: 20px;
    line-height: 38px;
  }
`

const PenOuter = styled.span`
  position: absolute;
  bottom: 9px;
  right: 0;
  width: 52px;
  height: 52px;
  background: #5389a4b3;
  border-radius: 50%;
  cursor: pointer;
`

const PenInner = styled.span`
  width: 40px;
  height: 40px;
  display: block;
  border-radius: 50%;
  text-align: center;
  margin: 6px auto 0px;
  background: #efefef;
  & i {
    color: #2a4755;
    font-size: 20px;
    line-height: 38px;
  }
`
const Subheader = styled.section`
  display: flex;
`
const Name = styled.h1`
  color: #efefef;
  margin: 10px auto;
  text-align: center;
  font-size: 30px;
  font-weight: 300;
`

const Karma = styled.h2`
  color: #efefef;
  margin: 10px auto;
  font-size: 30px;
  font-weight: 300;
  & i {
    padding: 0 5px;
    line-height: 10px;
  }
`
const DetailsContainer = styled.section`
  display: grid;
  grid-template-rows: auto 36px 56px;
  background: #efefef;
`

const About = styled.p`
  position: relative;
  padding: 10px;
  text-align: left;
  background-color: #fff;
  padding: 1.125em 1.5em;
  margin: 1.125em;
  font-size: 1.1em;
  border-radius: 1rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3),
    0 0.0625rem 0.125rem rgba(0, 0, 0, 0.2);
  height: ${props => (props.about ? '' : '60px')};
  font-style: ${props => (props.about ? 'inherit' : 'italic')};
  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -12px;
    border: 0.75rem solid transparent;
    border-top: none;
    border-bottom-color: #fff;
    filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
  }
`

const Registered = styled.p`
  text-align: center;
  font-size: 13px;
  height: 20px;
  color: #4d4d4d;
  margin: 15px 0;
  & i {
    padding: 0 5px;
  }
`

const Contact = styled.button`
  position: fixed;
  font-family: 'Lato';
  left: 0;
  bottom: 0;
  color: white;
  width: 100%;
  height: 40px;
  padding: 8px;
  border: none;
  font-size: 18px;
  background: #2a4755;
  text-align: center;
  align-self: end;
  outline: 0;
  cursor: pointer;
  display: ${props => (props.sideNavOpen ? 'none' : 'block')};
`
