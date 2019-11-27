import React, { Children } from 'react'
import styled from 'styled-components/macro'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

import maleImg from './img/male.svg'
import femaleImg from './img/female.svg'

export default function AnimalProfile({ animal }) {
  const gallery = [animal.profilePicture, ...animal.gallery]

  return (
    <Profile>
      <CarouselContainer>
        <Carousel showThumbs={false}>
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
          <Race>{animal.race},</Race>
          <Age>{animal.age} Wochen alt</Age>
        </Subtitle>
        <Description>{animal.description}</Description>
        <Registered>Am {animal.registered.substr(0, 5)} hinzugefügt</Registered>
        <Contact>Kontaktinformationen anzeigen</Contact>
      </DetailsContainer>
    </Profile>
  )
}

const Profile = styled.section`
  display: flex;
  flex-direction: column;

  background: white;
  height: 100vh;
  text-align: center;
`
const CarouselContainer = styled.div`
  .carousel .carousel-status {
    position: absolute;
    left: 10px;
    right: inherit;
  }
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
  z-index: 3;
  border: 3px solid
    ${animal => (animal.gender === 'male' ? '#99ddfc' : '#f1919b')};
  padding: 3px;
  border-bottom-left-radius: 30px;
`

const DetailsContainer = styled.div`
  flex-grow: 1;
  display: grid;
  height: auto;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 60px 50px 1fr 30px 50px;
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
  margin: 10px 0 10px 10px;
`

const Age = styled.h2`
  display: inline;
  justify-self: start;
  margin: 10px 0 10px 10px;
`
const Description = styled.p`
  padding: 10px;
  text-align: left;
  grid-column: 1 / span 4;
`
const Registered = styled.p`
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
