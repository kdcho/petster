import React from 'react'
import styled from 'styled-components/macro'

import maleImg from './img/male.svg'
import femaleImg from './img/female.svg'

export default function Card({ ...props }) {
  return (
    <CardBox>
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
    </CardBox>
  )
}

const CardBox = styled.div`
  display: grid;
  text-align: center;
`

const Name = styled.p`
  display: inline-block;
  font-size: 22px;
  margin: 10px 0;
`

const Gender = styled.img`
  position: absolute;
  right: 0;
  top: 5px;
  width: 30px;
  background: #ffffff;
  border: 3px solid
    ${props => (props.gender === 'male' ? '#99ddfc' : '#f1919b')};
  border-radius: 20%;
  padding: 3px;
`

const PictureContainer = styled.div`
  overflow: hidden;
  position: relative;
`

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 100%;
  max-width: 100px;
`

const Registered = styled.p`
  font-size: 13px;
  margin: 0;
  color: gray;
`
