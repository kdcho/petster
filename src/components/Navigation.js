import React from 'react'
import styled, { css } from 'styled-components/macro'
import { Link, useLocation } from 'react-router-dom'
import logo from '../img/logo.svg'
import magnifier from '../img/magnifier_dark.svg'

export default function Navigation({
  handleSideNav,
  handleSearch,
  sideNavOpen,
  animalprofile,
  userprofile
}) {
  const { pathname } = useLocation()

  return (
    <Container animalprofile={animalprofile} sideNavOpen={sideNavOpen}>
      <Header
        animalprofile={animalprofile}
        userprofile={userprofile}
        sideNavOpen={sideNavOpen}
      >
        <img src={logo} alt={'logo'} />
        <img onClick={handleSearch} src={magnifier} alt={'search'} />
      </Header>
      <BurgerBtn
        onClick={event => {
          if (pathname.includes('animalprofile')) {
            handleSideNav()
          } else if (pathname.includes('profile')) {
            handleSideNav()
          } else {
            handleSearch(event)
            handleSideNav()
          }
        }}
        id="BurgerBtn"
        sideNavOpen={sideNavOpen}
      />
      <Sidebar sideNavOpen={sideNavOpen}>
        <MenuItem to={'/'} onClick={handleSideNav} sideNavOpen={sideNavOpen}>
          Gallery
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
}

const Container = styled.div`
  width: 100%;
  height: 48px;
  ${props =>
    props.animalprofile &&
    css`
      height: 0;
    `}
`
const BurgerBtn = styled.div`
  border-top: 2px solid #2a4755;
  height: 25px;
  width: 28px;
  position: fixed;
  z-index: 2;
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
    background: #2a4755;
    top: 8px;
    transition: all 0.3s ease-in;
    width: ${props => (props.sideNavOpen ? '30px' : '28px')};
    left: ${props => (props.sideNavOpen ? '-2px' : '0')};
    transform: ${props => (props.sideNavOpen ? 'rotate(45deg)' : 'none')};
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    height: 2px;
    width: ${props => (props.sideNavOpen ? '30px' : '28px')};
    left: ${props => (props.sideNavOpen ? '-2px' : '0')};
    background: #2a4755;
    bottom: ${props => (props.sideNavOpen ? '13px' : '3px')};
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
    transition: all 0.3s ease-in;
    ${props =>
      props.animalprofile &&
      css`
        opacity: 0;
      `}
  }
  & img:last-of-type {
    position: absolute;
    height: 50px;
    padding: 10px;
    align-self: end;
    cursor: pointer;
    transition: all 0.3s ease-in;
    opacity: ${props => (props.sideNavOpen ? '0' : '1')};
    ${props =>
      props.animalprofile &&
      css`
        opacity: 0;
      `}
    ${props =>
      props.userprofile &&
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

const Sidebar = styled.nav`
  list-style-type: none;
  overflow: hidden;
  background: #c6c4c1;
  height: 100vh;
  transition: all 0.3s ease-in;
  padding: ${props => (props.sideNavOpen ? '50px 30px 30px 30px' : '0')};
  width: ${props => (props.sideNavOpen ? '300px' : '0')};
`

const LinkStyled = ({ sideNavOpen, children, ...rest }) => (
  <Link {...rest}>{children}</Link>
)

const MenuItem = styled(LinkStyled)`
  display: block;
  word-break: keep-all;
  text-decoration: none;
  padding: 3px 3px 3px 10px;
  color: #000;
  font-size: 18px;
  height: 30px;
  margin: 30px 0;
  background: #eae8e5;
  transition: all 0.3s ease-in;
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
