import styled from 'styled-components/macro'

export default styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
  background: lightgray;
  opacity: 0.8;
  width: 100%;
  height: 100vh;
  z-index: 1;
  position: absolute;
  top: 0;
`
