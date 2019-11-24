import React from 'react'
import styled from 'styled-components/macro'

export default function Card({ name, gender, registered, picture }) {
  const male = '/img/male.svg'
  const female = '/img/female.svg'

  return (
    <CardBox>
      <PictureContainer>
        <ProfilePicture src={picture} alt={name}></ProfilePicture>
        <Gender src={gender === 'male' ? male : female} alt={gender} gender={gender}></Gender>
      </PictureContainer>
      <Name>{name}</Name>
      <Registered>Am {registered} hinzugefügt</Registered>
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
  border: 3px solid ${props => props.gender === 'male' ? '#99ddfc' : '#f1919b'};
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
  max-width: 120px;
`

const Registered = styled.p`
  font-size: 13px;
  margin: 0;
  color: gray;
`
