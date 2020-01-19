import React, { useState } from 'react'
import AnimalThumbnail from './AnimalThumbnail'
import styled from 'styled-components/macro'
import Navigation from '../components/Navigation'
import SearchInput from '../components/Search'
import { Redirect, Route } from 'react-router-dom'

export default function Gallery({
  handleAnimal,
  handleSideNav,
  sideNavOpen,
  animalList,
  handleSignOut,
  loggedIn
}) {
  const [showSearch, setshowSearch] = useState(false)
  const [showFilteredByBreed, setShowFilteredByBreed] = useState('')

  return (
    <Route>
      {loggedIn ? (
        <Container>
          <Navigation
            handleSideNav={handleSideNav}
            handleSearch={handleSearch}
            sideNavOpen={sideNavOpen}
            handleSignOut={handleSignOut}
          />
          <Searchbar showSearch={showSearch}>
            <SearchInput getUserInput={getUserInput} gallery />
          </Searchbar>
          <GalleryBox sideNavOpen={sideNavOpen}>
            {animalList
              .filter(animal => {
                return animal.breed
                  .toLowerCase()
                  .includes(showFilteredByBreed.toLowerCase())
                  ? true
                  : false
              })
              .map(animal => (
                <AnimalThumbnail
                  key={animal._id}
                  handleAnimal={() => handleAnimal(animal)}
                  {...animal}
                />
              ))}
          </GalleryBox>
        </Container>
      ) : (
        <Redirect to="/login/" />
      )}
    </Route>
  )

  function handleSearch(event) {
    setshowSearch(event.target.id === 'BurgerBtn' ? false : !showSearch)
  }

  function getUserInput(userInput) {
    setShowFilteredByBreed(userInput)
  }
}

const Container = styled.div`
  height: 100vh;
`

const GalleryBox = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  transition: all 0.3s ease-in;
  margin-left: ${props => (props.sideNavOpen ? '300px' : '0')};
  opacity: ${props => (props.sideNavOpen ? '0.4' : '1')};
`
const Searchbar = styled.div`
  display: flex;
  flex-direction: column;
  background: #eaeaea;
  transition: all 0.2s ease-in;
  height: ${props => (props.showSearch ? '44px' : '0')};
  opacity: ${props => (props.showSearch ? '1' : '0')};
  input {
    outline: none;
    margin: 7px;
    padding: 5px 10px;
    border: 0;
    border-radius: 5px;
    box-shadow: 0 0.15rem 0.15rem rgba(0, 0, 0, 0.2),
      0 0 0rem rgba(0, 0, 0, 0.2);
  }
`
