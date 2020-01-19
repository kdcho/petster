import React from 'react'
import styled, { keyframes } from 'styled-components/macro'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Link } from 'react-router-dom'

import maleImg from '../img/male.svg'
import femaleImg from '../img/female.svg'
import moment from 'moment'

export default function AnimalProfile({ animal }) {
  const gallery = [animal.profilePicture, ...animal.gallery]

  return (
    <Container>
      <NavigationWrapper to={'/gallery'}>
        <i className="fas fa-arrow-left"></i>
      </NavigationWrapper>
      <ProfilePage>
        <CarouselContainer>
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
        <DetailsContainer>
          <Name>{animal.name}</Name>
          <Subtitle>
            <Breed>{animal.breed},</Breed>
            <Age>{animal.age}</Age>
          </Subtitle>
          <Description>{animal.desc}</Description>
          <Registered>
            {moment(new Date(animal.registered.seconds * 1000)).fromNow()}{' '}
            hinzugefügt
          </Registered>
          <Contact gender={animal.gender}>
            Kontaktinformationen anzeigen
          </Contact>
        </DetailsContainer>
      </ProfilePage>
    </Container>
  )
}

const Container = styled.section`
  display: grid;
  grid-template-rows: 0 auto;
  height: 100vh;
  width: 100%;
  background: #f8f7f5;
  overflow: hidden;
  z-index: 2;
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

const ProfilePage = styled.div`
  display: grid;
  grid-template-rows: 300px auto;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
`
const blur = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}`

const CarouselContainer = styled.div`
  .carousel.carousel-slider .control-arrow {
    padding: 15px;
    animation: ${blur} 1s ease-in forwards;
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
    ${props => (props.gender === 'male' ? '#99ddfc' : '#f1919b')};
  padding: 3px;
  border-bottom-left-radius: 20px;
`

const DetailsContainer = styled.div`
  z-index: 1;
  height: 100%;
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 60px 50px auto 30px 50px;
`

const Name = styled.h1`
  margin: 10px 0 10px 10px;
  font-size: 30px;
  grid-column: 1 / span 4;
`

const Subtitle = styled.div`
  margin: 10px 0 10px 10px;
  grid-column: 1 / span 4;
  font-size: 14px;
`

const Breed = styled.h2`
  display: inline;
  color: #383838;
  margin: 10px 0 10px 0;
`

const Age = styled.p`
  color: #383838;
  margin: 10px 0;
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
  border: none;
  outline: 0;
  padding: 8px;
  color: white;
  background: #2a4755;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
  grid-column: 1 / span 4;
`
