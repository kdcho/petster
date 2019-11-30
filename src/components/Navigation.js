import React from 'react'
import styled from 'styled-components/macro'

export default function Navigation({ handleSideNav, sideNavOpen }) {
  return (
    <Container>
      <BurgerBtn onClick={handleSideNav} sideNavOpen={sideNavOpen} />
      <SideNav sideNavOpen={sideNavOpen}>
        <MenuItem sideNavOpen={sideNavOpen}>Home</MenuItem>
        <MenuItem sideNavOpen={sideNavOpen}></MenuItem>
        <MenuItem sideNavOpen={sideNavOpen}></MenuItem>
        <MenuItem sideNavOpen={sideNavOpen}></MenuItem>
      </SideNav>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: #c6c4c1;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const BurgerBtn = styled.div`
  border-top: 2px solid #f85051;
  height: 25px;
  width: 30px;
  box-sizing: border-box;
  position: absolute;
  z-index: 3;
  left: 20px;
  top: 15px;
  border-color: ${props => (props.sideNavOpen ? 'transparent' : 'none')};
  cursor: pointer;
  transition: all 0.3s ease-in;
  &::before {
    content: '';
    display: block;
    position: absolute;
    height: 2px;
    width: ${props => (props.sideNavOpen ? '33px' : '30px')};
    left: ${props => (props.sideNavOpen ? '-2px' : '0')};
    background: #f85051;
    top: 10px;
    transition: all 0.3s ease-in;
    transform: ${props => (props.sideNavOpen ? 'rotate(45deg)' : 'none')};
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    height: 2px;
    width: ${props => (props.sideNavOpen ? '33px' : '30px')};
    left: ${props => (props.sideNavOpen ? '-2px' : '0')};
    background: #f85051;
    bottom: ${props => (props.sideNavOpen ? '11px' : '0')};
    transition: all 0.3s ease-in;
    transform: ${props => (props.sideNavOpen ? 'rotate(135deg)' : 'none')};
  }
`

const SideNav = styled.nav`
  position: absolute;
  z-index: 10;
  list-style-type: none;
  margin: 100px 0 0 20px;
  padding: 0;
  overflow: hidden;
`

const MenuItem = styled.li`
    height: 30px;
    margin: 30px 0;
    background: #eae8e5;
    transition: all 0.6s ease-in;
    width: ${props => (props.sideNavOpen ? '200px' : '0')};
    margin-left: ${props => (props.sideNavOpen ? '0' : 'unset')};
  }
  &:nth-of-type(2) {
    margin-left: ${props => (props.sideNavOpen ? '0' : '-40px')};
  }

  &:nth-of-type(3) {
    margin-left: ${props => (props.sideNavOpen ? '0' : '-80px')};
  }

  &:nth-of-type(4) {
    margin-left: ${props => (props.sideNavOpen ? '0' : '-120px')};
`
