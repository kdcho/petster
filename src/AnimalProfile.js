import React from 'react'
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
      <Name>{animal.name}</Name>
      <Age>{animal.age}</Age>
      <Race>{animal.race}</Race>
      <Tags>{animal.tags}</Tags>
      <Registered>Am {animal.registered.substr(0, 5)} hinzugefügt</Registered>
      <Contact>Kontaktinformationen anzeigen</Contact>
    </Profile>
  )
}

const Profile = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const Name = styled.h1`
  display: inline-block;
  margin: 10px 0;
`

const Age = styled.p``

const Race = styled.p``

const Tags = styled.p``

const Registered = styled.p`
  font-size: 13px;
  margin: 0;
  color: gray;
  padding-bottom: 5px;
`

const Contact = styled.button`
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
`
