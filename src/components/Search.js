import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'

import deleteIcon from '../img/delete.svg'

export default function Search() {
  const breeds = require('../breeds.json')

  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [userInput, setUserInput] = useState('')

  useEffect(() => {
    setFilteredSuggestions(
      breeds.filter(
        suggestion =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      )
    )
  }, [breeds, userInput])

  function onChange(event) {
    setUserInput(event.currentTarget.value)
    setActiveSuggestion(0)
    setShowSuggestions(true)
    setUserInput(event.currentTarget.value)
  }

  function onClick(event) {
    setActiveSuggestion(0)
    setFilteredSuggestions([])
    setShowSuggestions(false)
    setUserInput(event.currentTarget.innerText)
  }
  function onKeyDown(event) {
    if (event.keyCode === 13) {
      setActiveSuggestion(0)
      setShowSuggestions(false)
      setUserInput(filteredSuggestions[activeSuggestion])
    } else if (event.keyCode === 38) {
      if (activeSuggestion === 0) {
        return
      }
      setActiveSuggestion(activeSuggestion - 1)
    } else if (event.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return
      }
      setActiveSuggestion(activeSuggestion + 1)
    }
  }

  let suggestionsListComponent

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <SuggestionsList showSuggestions={showSuggestions}>
          {filteredSuggestions.map((suggestion, index) => {
            let className

            if (index === activeSuggestion) {
              className = 'active'
            }

            return (
              <li className={className} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            )
          })}
        </SuggestionsList>
      )
    } else {
      suggestionsListComponent = (
        <div>
          <em>No suggestions, you're on your own!</em>
        </div>
      )
    }
  }

  return (
    <>
      <SearchField>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          placeholder="Durchsuchen.."
          required
        />
        <SearchIcon onClick={() => setUserInput('')} src={deleteIcon} />
        {suggestionsListComponent}
      </SearchField>
    </>
  )
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
    z-index: 2;
  }
`
const SearchIcon = styled.img`
  position: absolute;
  height: 25px;
  padding: 5px;
  top: 9px;
  right: 10px;
  z-index: 2;
  cursor: pointer;
`

const SuggestionsList = styled.ul`
  position: absolute;
  width: 100%;
  border: 1px solid #999;
  padding: 0;
  list-style: none;
  margin-top: 0;
  max-height: 143px;
  overflow-y: auto;
  z-index: 2;
  background: #fff;
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
