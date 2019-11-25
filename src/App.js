import React, { useState } from 'react'
import GlobalStyle from './styles/GlobalStyle'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Gallery from './Gallery.js'

function App() {
  const database = require('./database.json')
  const [modal, setModal] = useState(false)

  return (
    <Router>
      <>
        <GlobalStyle />
        <Switch>
          <Route path="/">
            <Gallery database={database} handleModal={handleModal} />
          </Route>
        </Switch>

        <nav>
          <Link to="/">Gallery</Link>
        </nav>
      </>
    </Router>
  )

  function handleModal() {
    setModal(!modal)
  }
}

export default App
