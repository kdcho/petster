import { createGlobalStyle } from 'styled-components/macro'

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  scrollbar-width: none;
  ::-webkit-scrollbar {display: none;}
}

body {
  font-family: 'Lato', sans-serif;
  margin: 0;
  height: 100vh;
}
`

export default GlobalStyle
