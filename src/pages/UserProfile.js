import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PictureUpload from '../components/PictureUpload'
import { Link, Route, Redirect } from 'react-router-dom'
import moment from 'moment'

moment.updateLocale('de', {
  relativeTime: {
    future: 'in %s',
    past: 'seit %s'
  }
})

export default function UserProfile({ user, image, upload, loggedIn }) {
  const [openUpload, setOpenUpload] = useState(false)

  return (
    <Route>
      {loggedIn ? (
        <Container>
          <NavigationWrapper to={'/gallery'}>
            <i className="fas fa-arrow-left"></i>
          </NavigationWrapper>
          <Profile>
            <Header>
              <ProfilePic>
                <PicWrapper>
                  <img src={user.photoURL} alt="profile" />
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
            <DetailsContainer>
              <About about={user.about}>
                {user.about ? user.about : 'Beschreibung folgt..'}
              </About>
              <Registered>
                <i className="fa fa-calendar-alt" aria-hidden="true" />
                Registriert{' '}
                {moment(
                  new Date(user.registered.seconds * 1000)
                ).fromNow()}{' '}
              </Registered>
              <Contact>Kontaktinformationen anzeigen</Contact>
            </DetailsContainer>
          </Profile>
          {openUpload ? (
            <PictureUpload image={image} upload={upload}></PictureUpload>
          ) : (
            ''
          )}
        </Container>
      ) : (
        <Redirect to="/gallery" />
      )}
    </Route>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: #2a4755;
`
const NavigationWrapper = styled(Link)`
  & i {
    padding: 20px 20px 0 20px;
    color: #fff;
    font-size: 32px;
    z-index: 5;
    position: fixed;
  }
`

const Profile = styled.div`
  display: grid;
  grid-template-rows: 280px auto;
  width: 100%;
`

const Header = styled.header`
  padding-top: 20px;
`

const ProfilePic = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
`

const PicWrapper = styled.div`
  width: 200px;
  height: 200px;
  border: 10px solid #5389a4;
  border-radius: 50%;
  overflow: hidden;
  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
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
`
