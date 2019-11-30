import React, { useState } from 'react'
import styled from 'styled-components/macro'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Navigation from './components/Navigation'

import maleImg from './img/male.svg'
import femaleImg from './img/female.svg'

export default function AnimalProfile({ animal }) {
  const gallery = [animal.profilePicture, ...animal.gallery]
  const [sideNavOpen, setSideNavOpen] = useState(false)

  return (
    <>
      <Profile>
        <Navigation
          handleSideNav={() => setSideNavOpen(!sideNavOpen)}
          sideNavOpen={sideNavOpen}
        />
        <ProfilePage sideNavOpen={sideNavOpen}>
          <CarouselContainer sideNavOpen={sideNavOpen}>
            <Carousel showThumbs={false} showStatus={false}>
              {gallery.map((picture, index) => (
                <Slider key={index} src={picture} alt={animal.name}></Slider>
              ))}
            </Carousel>
            <Gender
              src={animal.gender === 'male' ? maleImg : femaleImg}
              alt={animal.gender}
              gender={animal.gender}
            ></Gender>
          </CarouselContainer>
          <DetailsContainer sideNavOpen={sideNavOpen}>
            <Name>{animal.name}</Name>
            <Subtitle>
              <Race>{animal.race},</Race>
              <Age>{animal.age} Wochen alt</Age>
            </Subtitle>
            <Description>{animal.description}</Description>
            <Registered>
              Am {animal.registered.substr(0, 5)} hinzugefügt
            </Registered>
            <Contact>Kontaktinformationen anzeigen</Contact>
          </DetailsContainer>
        </ProfilePage>
      </Profile>
    </>
  )
}

const Profile = styled.section`
  display: grid;
  grid-template-rows: 0 auto;
  height: 100vh;
  width: 100%;
  background: #f8f7f5;
  overflow: hidden;
  transition: all 0.3s ease-in;
`

const ProfilePage = styled.div`
  display: grid;
  grid-template-rows: 300px auto;
  overflow: hidden;
  transition: all 0.3s ease-in;
  visibility: ${props => (props.sideNavOpen ? 'hidden' : 'visible')};
  transform: ${props => (props.sideNavOpen ? 'scale(0.85)' : 'none')};
  opacity: ${props => (props.sideNavOpen ? '0' : '1')};
`

const CarouselContainer = styled.div`
  .carousel.carousel-slider .control-arrow {
    padding: 15px;
  }
  .carousel .control-next.control-arrow::before {
    border-left: 12px solid #fff;
  }
  .carousel .control-prev.control-arrow::before {
    border-right: 12px solid #fff;
  }
  ul {
    padding: 0;
  }
`

const Slider = styled.img`
  max-height: 300px;
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: relative;
`

const Gender = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  background: #ffffff;
  z-index: 2;
  border: 3px solid
    ${animal => (animal.gender === 'male' ? '#99ddfc' : '#f1919b')};
  padding: 3px;
  border-bottom-left-radius: 30px;
`

const DetailsContainer = styled.div`
  z-index: 1;
  background: #fff;
  height: 100%;
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 60px 50px auto 30px 50px;
`

const Name = styled.h1`
  justify-self: start;
  margin: 10px 0 10px 10px;
  font-size: 40px;
  grid-column: 1 / span 4;
`

const Subtitle = styled.div`
  justify-self: start;
  margin: 10px 0 10px 10px;
  grid-column: 1 / span 4;
`

const Race = styled.h2`
  display: inline;
  justify-self: start;
  color: #383838;
  margin: 10px 0 10px 0;
`

const Age = styled.h2`
  display: inline;
  justify-self: start;
  color: #383838;
  margin: 10px 0 10px 10px;
`

const Description = styled.p`
  padding: 10px;
  text-align: left;
  grid-column: 1 / span 4;
`

const Registered = styled.p`
  text-align: center;
  font-size: 13px;
  margin: 0;
  color: gray;
  padding: 5px 0;
  align-self: end;
  grid-column: 1 / span 4;
`

const Contact = styled.button`
  display: absolute;
  border: none;
  outline: 0;
  padding: 8px;
  color: white;
  background: ${animal => (animal.gender === 'male' ? '#99ddfc' : '#f1919b')};
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
  grid-column: 1 / span 4;
`
