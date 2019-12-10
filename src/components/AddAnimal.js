import React from 'react'
import styled from 'styled-components/macro'
import Navigation from './Navigation'

export default function AddAnimal() {
  return (
    <>
      <Navigation />
      <AddAnimalForm>
        <div class="container subcontainer">
          <input type="text" name="name" placeholder="Name" />
        </div>
        <div class="container subcontainer">
          <input type="text" name="age" placeholder="Alter" />
        </div>
        <div class="container style2">
          <input type="radio" id="style2radio1" name="style2radio1" />
          <label for="style2radio1"></label>
          <span>Wochen</span>
          <input type="radio" id="style2radio2" name="style2radio1" />
          <label for="style2radio2"></label>
          <span>Jahre</span>
        </div>
        <div class="container subcontainer">
          <input type="file" alt="profile" />
        </div>
      </AddAnimalForm>
    </>
  )
}

const AddAnimalForm = styled.form`
  body {
    background: #2c3e50;
    padding: 20px 0px;
    font-family: 'ABeeZee', sans-serif;
    font-size: 15px;
  }

  h1 {
    text-align: center;
    color: #fff;
    font-size: 25px;
    margin-bottom: 20px;
  }

  .container {
    width: 260px;
    margin: 0 auto;
    border-bottom: 4px solid #3498db;
    padding: 15px 0px;
    @include box-sizing;
  }

  .subcontainer {
    border-width: 2px;
    border-color: #34495e;
  }

  input {
    display: none;
    font-size: 15px;
  }

  span {
    float: right;
    color: #ecf0f1;
  }

  .style2 {
    label {
      width: 18px;
      height: 18px;
      margin-bottom: -3px;
      margin-right: 46px;
      background: #e74c3c;
      border-radius: 3px;
      cursor: pointer;
      position: relative;
      display: inline-block;
      transition: 300ms all;
      &::after {
        content: '';
        position: absolute;
        width: 3px;
        height: 11px;
        left: 7px;
        top: 1px;
        border-right: 2px solid #fff;
        border-bottom: 2px solid #fff;
        transform: rotate(45deg);
        opacity: 0;
        z-index: 1;
        transition: 300ms opacity;
      }
    }
    input:checked + label {
      background: #27ae60;
    }
    input:checked + label::after {
      opacity: 1;
    }
    input[type='radio'] + label {
      border-radius: 100%;
      &::after {
        left: 6px;
        top: 2px;
        height: 10px;
      }
    }
  }

  input[type='text'],
  input[type='email'],
  input[type='file'] {
    display: inline-block;
    border: none;
    background: #34495e;
    @include box-sizing;
    padding: 8px;
    color: #ecf0f1;
    width: 100%;
    &:focus {
      outline: none;
    }
    &::-webkit-input-placeholder {
      color: #999;
    }
    &:-moz-input-placeholder {
      color: #999;
    }
    &::-moz-placeholder {
      color: #999;
    }
  }

  textarea {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    min-height: 80px;
    @include box-sizing;
    padding: 8px;
    background: #34495e;
    border: none;
    color: #ecf0f1;
    font-size: 15px;
    font-family: 'ABeeZee', sans-serif;
    &:focus {
      outline: none;
    }
    &::-webkit-input-placeholder {
      color: #999;
    }
    &:-moz-input-placeholder {
      color: #999;
      font-family: 'ABeeZee', sans-serif;
    }
    &::-moz-placeholder {
      color: #999;
      font-family: 'ABeeZee', sans-serif;
    }
  }

  select.selectbox {
    display: none;
  }
  dl.selectbox {
    width: 100%;
    cursor: pointer;
    position: relative;
    dt {
      width: 100%;
      background: #34495e;
      @include box-sizing;
      color: #ecf0f1;
      padding: 8px;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        width: 12px;
        height: 12px;
        border-right: solid 1px #bdc3c7;
        border-bottom: solid 1px #bdc3c7;
        right: 10px;
        top: 6px;
        transform: rotate(45deg);
      }
    }
    dt.open::after {
      transform: rotate(225deg);
      top: 12px;
    }
    dd {
      position: absolute;
      width: 100%;
      z-index: 10;
      visibility: hidden;
      opacity: 0;
      transition: 300ms all;
      &.open {
        visibility: visible;
        opacity: 1;
      }
    }
    dd ul li {
      width: 100%;
      background: #344956;
      @include box-sizing;
      color: #ecf0f1;
      padding: 8px;
    }
  }

  input[type='submit'] {
    display: block;
    @include box-sizing;
    border: none;
    -webkit-appearance: none;
    color: #ecf0f1;
    padding: 8px;
    background: #34495e;
    width: 100%;
    cursor: pointer;
    &:active,
    &:focus {
      outline: none;
    }
  }
`
