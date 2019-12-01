import React, { useState, Fragment } from 'react'

export default function Search() {
  const breeds = require('../breeds.json')

  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [userInput, setUserInput] = useState('')

  function onChange(e) {
    const userInput = e.currentTarget.value

    setActiveSuggestion(0)
    setFilteredSuggestions(
      breeds.filter(
        suggestion =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      )
    )
    setShowSuggestions(true)
    setUserInput(e.currentTarget.value)
  }

  function onClick(e) {
    setActiveSuggestion(0)
    setFilteredSuggestions([])
    setShowSuggestions(false)
    setUserInput(e.currentTarget.innerText)
  }
  function onKeyDown(e) {
    if (e.keyCode === 13) {
      setActiveSuggestion(0)
      setShowSuggestions(false)
      setUserInput(filteredSuggestions[activeSuggestion])
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return
      }
      setActiveSuggestion(activeSuggestion - 1)
    } else if (e.keyCode === 40) {
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
        <ul class="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = 'suggestion-active'
            }

            return (
              <li className={className} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            )
          })}
        </ul>
      )
    } else {
      suggestionsListComponent = (
        <div class="no-suggestions">
          <em>No suggestions, you're on your own!</em>
        </div>
      )
    }
  }

  return (
    <Fragment>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {suggestionsListComponent}
    </Fragment>
  )
}
