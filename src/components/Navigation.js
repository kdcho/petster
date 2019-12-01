import React, { useState } from 'react'
import styled, { css } from 'styled-components/macro'
import { Link } from 'react-router-dom'

import logo from '../img/logo.svg'
import magnifier from '../img/magnifier_dark.svg'

export default function Navigation({
  handleSideNav,
  handleSearch,
  sideNavOpen,
  animalprofile
}) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <Container animalprofile={animalprofile} sideNavOpen={sideNavOpen}>
      <Header animalprofile={animalprofile} sideNavOpen={sideNavOpen}>
        <img src={logo} alt={'logo'} />
        <img onClick={handleSearch} src={magnifier} alt={'search'} />
      </Header>
      <BurgerBtn onClick={handleSideNav} sideNavOpen={sideNavOpen} />
      <Search searchOpen={searchOpen}>
        <input placeholder="Durchsuchen..." required></input>
      </Search>
      <Sidebar sideNavOpen={sideNavOpen}>
        <MenuItem to={'/'} onClick={handleSideNav} sideNavOpen={sideNavOpen}>
          Gallery
        </MenuItem>
        <MenuItem
          to={'/search'}
          onClick={handleSideNav}
          sideNavOpen={sideNavOpen}
        >
          Suche
        </MenuItem>
        <MenuItem
          to={'/profile'}
          onClick={handleSideNav}
          sideNavOpen={sideNavOpen}
        >
          Eigenes Profil
        </MenuItem>
        <MenuItem
          to={'/settings'}
          onClick={handleSideNav}
          sideNavOpen={sideNavOpen}
        >
          Einstellungen
        </MenuItem>
        <MenuItem
          to={'/about'}
          onClick={handleSideNav}
          sideNavOpen={sideNavOpen}
        >
          Über Petster
        </MenuItem>
      </Sidebar>
    </Container>
  )

  function handleSearch() {
    setSearchOpen(!searchOpen)
  }
}

const Container = styled.div`
  width: 100%;
  transition: all 0.5s ease-in;
  height: ${props => (props.sideNavOpen ? '0' : '48px')};
  ${props =>
    props.animalprofile &&
    css`
      height: 0;
    `}
`

const BurgerBtn = styled.div`
  border-top: 2px solid #2a4755;
  height: 25px;
  width: 27px;
  position: fixed;
  z-index: 4;
  left: 20px;
  top: 14px;
  border-color: ${props => (props.sideNavOpen ? 'transparent' : 'none')};
  cursor: pointer;
  transition: all 0.3s ease-in;
  &::before {
    content: '';
    display: block;
    position: absolute;
    height: 2px;
    width: ${props => (props.sideNavOpen ? '30px' : '27px')};
    left: ${props => (props.sideNavOpen ? '-2px' : '0')};
    background: #2a4755;
    top: 8px;
    transition: all 0.3s ease-in;
    transform: ${props => (props.sideNavOpen ? 'rotate(45deg)' : 'none')};
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    height: 2px;
    width: ${props => (props.sideNavOpen ? '30px' : '27px')};
    left: ${props => (props.sideNavOpen ? '-2px' : '0')};
    background: #2a4755;
    bottom: ${props => (props.sideNavOpen ? '14px' : '3px')};
    transition: all 0.3s ease-in;
    transform: ${props => (props.sideNavOpen ? 'rotate(135deg)' : 'none')};
  }
`

const Header = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  background: #fff;
  flex-direction: column;
  width: 100%;
  height: 48px;
  z-index: 2;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2), 0 0 0rem rgba(0, 0, 0, 0.2);
  & img:first-of-type {
    position: absolute;
    height: 40px;
    margin-top: 5px;
    align-self: center;
    transition: all 0.5s ease-in;
    ${props =>
      props.animalprofile &&
      css`
        opacity: 0;
      `}
  }
  & img:last-of-type {
    position: absolute;
    height: 30px;
    margin: 10px 10px 0 0;
    align-self: end;
    cursor: pointer;
    transition: all 0.5s ease-in;
    opacity: ${props => (props.sideNavOpen ? '0' : '1')};
    ${props =>
      props.animalprofile &&
      css`
        opacity: 0;
      `}
  }

  ${props =>
    props.animalprofile &&
    css`
      background: #c6c4c1;
      height: 0;
    `}
`

const Search = styled.div`
  width: 100%;
  background: #eaeaea;
  text-align: center;
  transition: all 0.3s ease-in;
  margin-top: ${props => (props.searchOpen ? '48px' : '0')};
  opacity: ${props => (props.searchOpen ? '1' : '0')};
  & input {
    outline: none;
    margin: 7px;
    padding: 5px 10px;
    border: 0;
    width: 40%;
    border-radius: 5px;
    box-shadow: 0 0.15rem 0.15rem rgba(0, 0, 0, 0.2),
      0 0 0rem rgba(0, 0, 0, 0.2);
  }
`

const Sidebar = styled.nav`
  z-index: 10;
  list-style-type: none;
  overflow: hidden;
  background: #c6c4c1;
  height: 100vh;
  transition: all 0.5s ease-in;
  padding: ${props => (props.sideNavOpen ? '50px 30px 30px 30px' : '0')};
  width: ${props => (props.sideNavOpen ? '300px' : '0')};
`

const MenuItem = styled(Link)`
  display: block;
  word-break: keep-all;
  text-decoration: none;
  padding: 3px 3px 3px 10px;
  color: #000;
  font-size: 18px;
  height: 30px;
  margin: 30px 0;
  background: #eae8e5;
  transition: all 0.5s ease-in;
  opacity: ${props => (props.sideNavOpen ? '1' : '0')};
  width: ${props => (props.sideNavOpen ? '200px' : '0')};
  margin-left: ${props => (props.sideNavOpen ? '0' : '-40px')};
  &:nth-of-type(2) {
    margin-left: ${props => (props.sideNavOpen ? '0' : '-60px')};
  }

  &:nth-of-type(3) {
    margin-left: ${props => (props.sideNavOpen ? '0' : '-80px')};
  }

  &:nth-of-type(4) {
    margin-left: ${props => (props.sideNavOpen ? '0' : '-100px')};
  }

  &:nth-of-type(5) {
    margin-left: ${props => (props.sideNavOpen ? '0' : '-120px')};
  }
`
