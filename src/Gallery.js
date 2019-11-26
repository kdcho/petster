import React from 'react'
import AnimalThumbnail from './AnimalThumbnail'
import styled from 'styled-components/macro'

export default function Gallery({ database, handleAnimal }) {
  return (
    <ProfileContainer>
      {database.map(animal => (
        <AnimalThumbnail
          key={animal._id}
          handleAnimal={() => handleAnimal(animal)}
          {...animal}
        />
      ))}
    </ProfileContainer>
  )
}

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 10px;
`
