import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Fuse from 'fuse.js'

import deleteIcon from '../img/delete.svg'

export default function Search({ getUserInput }) {
  const breeds = require('../breeds.json')
  const options = {
    shouldSort: true,
    threshold: 0.6,
    keys: ['name']
  }

  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [suggestionsListOpen, setSuggestionsListOpen] = useState(false)

  const breedData = new Fuse(breeds, options)

  return (
    <SearchField>
      <input
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onFocus={onFocus && userInput.length > 0}
        value={userInput}
        type="text"
        placeholder="Durchsuchen.."
      />
      <SearchIcon />
      <SuggestionsList suggestionsListOpen={suggestionsListOpen}>
        {breedData.search(userInput).map((suggestedItem, index) => (
          <li
            onClick={onClick}
            className={index === activeSuggestion ? 'active' : ''}
            key={index + suggestedItem.name}
          >
            {suggestedItem.name}
          </li>
        ))}
      </SuggestionsList>
    </SearchField>
  )

  function onChange(event) {
    setActiveSuggestion(0)
    setUserInput(event.currentTarget.value)
  }

  function onClick(event) {
    setSuggestionsListOpen(true)
    setActiveSuggestion(0)
    setUserInput(event.currentTarget.innerText)
  }

  function onBlur() {
    setSuggestionsListOpen(false)
  }

  function onFocus() {
    setSuggestionsListOpen(true)
  }

  function onKeyDown(event) {
    if (event.keyCode === 13) {
      setActiveSuggestion(0)
      setUserInput(breedData[activeSuggestion])
    } else if (event.keyCode === 38) {
      if (activeSuggestion === 0) {
        return
      }
      setActiveSuggestion(activeSuggestion - 1)
    } else if (event.keyCode === 40) {
      if (activeSuggestion - 1 === breedData.length) {
        return
      }
      setActiveSuggestion(activeSuggestion + 1)
    }
  }
  /* return (
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
) */

  /* const [activeSuggestion, setActiveSuggestion] = useState(0)
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
    getUserInput(userInput)
  }, [breeds, getUserInput, userInput])

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
 */

  /* function onChange(event) {
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
      console.log(filteredSuggestions)
      console.log(event.currentTarget.value)
      console.log(filteredSuggestions[activeSuggestion])
      setUserInput(
        filteredSuggestions[activeSuggestion] || event.currentTarget.value
        )
        setFilteredSuggestions(() => filteredSuggestions[activeSuggestion])
      console.log(activeSuggestion)
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
  } */
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
  border: 1px solid #999;
  padding: 0;
  list-style: none;
  margin-top: 0;
  max-height: 143px;
  overflow-y: scroll;
  z-index: 1;
  background: #fff;
  display: ${props => (props.suggestionsListOpen ? 'block' : 'none')};
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
