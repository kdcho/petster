import React from 'react'
import AnimalThumbnail from "./AnimalThumbnail";
import styled from 'styled-components/macro'


export default function Gallery({database, handleModal}) {
  return (
    <ProfileContainer>
      {database.map(profile => (
        <AnimalThumbnail
          key={profile._id}
          handleModal={() => handleModal()}
          {...profile}
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
