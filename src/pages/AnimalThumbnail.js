import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import moment from 'moment'
import 'moment/locale/de'

import maleImg from '../img/male.svg'
import femaleImg from '../img/female.svg'

export default function AnimalThumbnail({ handleAnimal, ...animal }) {
  return (
    <Thumbnail to={() => `/animalprofile/${animal._id}`} onClick={handleAnimal}>
      <PictureContainer>
        <ProfilePicture
          src={animal.profilePicture}
          alt={animal.name}
        ></ProfilePicture>
        <Gender
          src={animal.gender === 'male' ? maleImg : femaleImg}
          alt={animal.gender}
          gender={animal.gender}
        ></Gender>
      </PictureContainer>
      <Name>{animal.name}</Name>
      <Registered>
        {moment(new Date(animal.registered.seconds * 1000)).fromNow()}{' '}
        hinzugefügt
      </Registered>
    </Thumbnail>
  )
}

const Thumbnail = styled(Link)`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 150px;
  border-radius: 5px;
  margin: 10px;
  text-decoration: none;
  color: #000;
  background: #fff;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2), 0 0 0rem rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.2), 0 0 1rem rgba(0, 0, 0, 0.2);
  }
`

const Name = styled.p`
  display: inline-block;
  font-size: 22px;
  margin: 10px 0;
`

const Gender = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  background: #ffffff;
  border: 3px solid
    ${props => (props.gender === 'male' ? '#99ddfc' : '#f1919b')};
  border-radius: 5px;
  padding: 3px;
`

const PictureContainer = styled.div`
  height: 150px;
  width: 150px;
  overflow: hidden;
  position: relative;
`

const ProfilePicture = styled.img`
  width: 100%;
  height: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  object-fit: cover;
`

const Registered = styled.p`
  display: flex;
  font-size: 12px;
  margin: 0;
  color: gray;
  padding-bottom: 5px;
  height: 35px;
  justify-content: center;
  align-items: center;
`
