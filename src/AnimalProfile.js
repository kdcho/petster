import React from 'react'
import styled from 'styled-components/macro'

import maleImg from './img/male.svg'
import femaleImg from './img/female.svg'

export default function AnimalProfile({ animal }) {
  const gallery = [animal.profilePicture, ...animal.gallery]
  console.log('here', gallery)
  return (
      <Profile>
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
        <Age>{animal.age}</Age>
        <Race>{animal.race}</Race>
        <Tags>{animal.tags}</Tags>
        <Registered>Am {animal.registered.substr(0, 5)} hinzugefügt</Registered>
      </Profile>
  )
}

const Profile = styled.section`
  background: white;
  height: 100vh;
`

const PictureContainer = styled.div`
  height: 300px;
  width: 100%;
  overflow: hidden;
  position: relative;
`

const ProfilePicture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Gender = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  background: #ffffff;
  border: 3px solid
    ${animal => (animal.gender === 'male' ? '#99ddfc' : '#f1919b')};
  padding: 3px;
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
