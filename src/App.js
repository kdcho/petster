import React from 'react'
import Card from './Card.js'
import GlobalStyle from './styles/GlobalStyle'
import styled from 'styled-components/macro'

function App() {
  const database = require('./cards.json')
  console.log(database)

  return (
    <>
      <GlobalStyle />
      <CardContainer>
        {database.map(card => (
          <Card
            key={card._id}
            name={card.name}
            gender={card.gender}
            registered={card.registered}
            picture={card.picture}
          />
        ))}
      </CardContainer>
    </>
  )
}

export default App

const CardContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 20px;
`
