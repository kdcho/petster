import React from 'react'
import AnimalThumbnail from './AnimalThumbnail'
import styled from 'styled-components/macro'
import Navigation from './components/Navigation'

export default function Gallery({
  database,
  handleAnimal,
  handleSideNav,
  sideNavOpen
}) {
  return (
    <Container>
      <Navigation handleSideNav={handleSideNav} sideNavOpen={sideNavOpen} />
      <GalleryBox sideNavOpen={sideNavOpen}>
        {database.map(animal => (
          <AnimalThumbnail
            key={animal._id}
            handleAnimal={() => handleAnimal(animal)}
            {...animal}
          />
        ))}
      </GalleryBox>
    </Container>
  )
}

const Container = styled.div`
  overflow: hidden;
`

const GalleryBox = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  transition: all 0.3s ease-in;
  margin-top: ${props => (props.sideNavOpen ? '48px' : '0')};
  margin-left: ${props => (props.sideNavOpen ? '300px' : '0')};
  opacity: ${props => (props.sideNavOpen ? '0.4' : '1')};
`
