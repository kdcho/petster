import React from 'react'
import styled from 'styled-components/macro'

import maleImg from './img/male.svg'
import femaleImg from './img/female.svg'

export default function AnimalThumbnail({ handleModal, ...props }) {
  return (
    <Thumbnail onClick={handleModal}>
      <PictureContainer>
        <ProfilePicture
          src={props.profilePicture}
          alt={props.name}
        ></ProfilePicture>
        <Gender
          src={props.gender === 'male' ? maleImg : femaleImg}
          alt={props.gender}
          gender={props.gender}
        ></Gender>
      </PictureContainer>
      <Name>{props.name}</Name>
      <Registered>Am {props.registered.substr(0, 5)} hinzugefügt</Registered>
    </Thumbnail>
  )
}

const Thumbnail = styled.div`
  display: grid;
  text-align: center;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2), 0 0 1rem rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.2), 0 0 2rem rgba(0, 0, 0, 0.2);
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
  font-size: 13px;
  margin: 0;
  color: gray;
  padding-bottom: 5px;
`
