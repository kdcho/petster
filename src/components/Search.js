/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Fuse from 'fuse.js'
import useKeyPress from './useKeyPress'

import deleteIcon from '../img/delete.svg'

export default function Search({ getUserInput }) {
  const breeds = require('../breeds.json')
  const options = {
    shouldSort: true,
    tokenize: true,
    threshold: 0.4,
    keys: ['name']
  }

  const enterKey = useKeyPress('Enter')
  const arrowUpKey = useKeyPress('ArrowUp')
  const arrowDownKey = useKeyPress('ArrowDown')

  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const breedData = new Fuse(breeds, options)

  useEffect(() => {
    setFilteredSuggestions(breedData.search(userInput))
    getUserInput(userInput)
  }, [userInput])

  useEffect(() => {
    if (enterKey) {
      setShowSuggestions(false)
      setActiveSuggestion(0)
      setUserInput(filteredSuggestions[activeSuggestion].name)
    } else if (arrowUpKey) {
      if (activeSuggestion === 0) {
        return
      }
      setActiveSuggestion(activeSuggestion - 1)
    } else if (arrowDownKey) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return
      }
      setActiveSuggestion(activeSuggestion + 1)
    }
  }, [enterKey, arrowDownKey, arrowUpKey])

  return (
    <SearchField>
      <input
        onChange={event => {
          setUserInput(event.currentTarget.value)
          setShowSuggestions(true)
        }}
        value={userInput}
        type="text"
        placeholder="Durchsuchen.."
      />
      <SearchIcon src={deleteIcon} onClick={() => setUserInput('')} />
      <SuggestionsList showSuggestions={showSuggestions}>
        {breedData.search(userInput).map((suggestedItem, index) => (
          <li
            onClick={onClick}
            className={index === activeSuggestion ? 'active' : ''}
            key={index + suggestedItem}
          >
            {suggestedItem.name}
          </li>
        ))}
      </SuggestionsList>
    </SearchField>
  )

  function onClick(event) {
    setShowSuggestions(false)
    setFilteredSuggestions([])
    setUserInput(event.currentTarget.innerText)
  }
}

const SearchField = styled.div`
  position: relative;
  width: 214px;
  align-self: center;

  & input:first-of-type {
    position: relative;
    border: 1px solid #999;
    padding: 5px 8px;
    font-size: 14px;
    width: 200px;
    z-index: 1;
  }
`
const SearchIcon = styled.img`
  position: absolute;
  height: 25px;
  padding: 5px;
  top: 9px;
  right: 10px;
  z-index: 1;
  cursor: pointer;
`

const SuggestionsList = styled.ul`
  position: absolute;
  width: 100%;
  padding: 0;
  list-style: none;
  margin-top: 0;
  max-height: 143px;
  overflow-y: scroll;
  z-index: 1;
  background: #fff;
  cursor: pointer;
  border: ${props => (props.showSuggestions ? '1px' : '0px')} solid #999;
  display: ${props => (props.showSuggestions ? 'block' : 'none')};
  & li {
    padding: 0.5rem;
  }

  & li:hover,
  .active {
    background-color: #2a4755;
    color: #fefefe;
    cursor: pointer;
    font-weight: 700;
  }

  & li:not(:last-of-type) {
    cursor: pointer;
    border-bottom: 1px solid #999;
  }
`
