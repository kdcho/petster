import React, { useRef, useState } from 'react'
import styled from 'styled-components/macro'

export default function PictureUpload() {
  const fileInput = useRef()
  const [fileAdded, setFileAdded] = useState(false)

  const [contrast, setContrast] = useState(100)
  const [brightness, setBrightness] = useState(100)
  const [hueRotate, setHueRotate] = useState(0)
  const [sepia, setSepia] = useState(0)

  const previewFile = file => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
      let img = document.createElement('img')
      img.src = reader.result
      img.setAttribute('data-pic', 'picture')
      document.getElementById('gallery').appendChild(img)
    }
  }

  return (
    <Container>
      <FilePicker>
        <ButtonWrapper>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInput}
            accept="image/*"
            onChange={event => previewFile(event.target.files[0])}
          />
          <ChooseFile
            type="button"
            onClick={() => {
              fileInput.current.click()
              setFileAdded(!fileAdded)
            }}
          >
            Foto auswählen
          </ChooseFile>
        </ButtonWrapper>
      </FilePicker>
      <Gallery
        id="gallery"
        contrast={contrast}
        brightness={brightness}
        hueRotate={hueRotate}
        sepia={sepia}
      ></Gallery>
      <Editor fileAdded={fileAdded}>
        <RangeWrapper>
          <label htmlFor="contrast">Contrast</label>
          <input
            onChange={event => setContrast(event.target.value)}
            onMouseOver={event => setContrast(event.target.value)}
            name="contrast"
            type="range"
            min="0"
            max="200"
          />
        </RangeWrapper>
        <RangeWrapper>
          <label htmlFor="brightness">Brightness</label>
          <input
            onChange={event => setBrightness(event.target.value)}
            onMouseOver={event => setBrightness(event.target.value)}
            name="brightness"
            type="range"
            min="0"
            max="200"
          />
        </RangeWrapper>
        <RangeWrapper>
          <label htmlFor="blur">Hue</label>
          <input
            onChange={event => setHueRotate(event.target.value)}
            onMouseOver={event => setHueRotate(event.target.value)}
            name="hue-rotate"
            type="range"
            min="0"
            max="200"
          />
        </RangeWrapper>
        <RangeWrapper>
          <label htmlFor="sepia">Sepia</label>
          <input
            onChange={event => setSepia(event.target.value)}
            onMouseOver={event => setSepia(event.target.value)}
            name="sepia"
            type="range"
            min="0"
            max="200"
          />
        </RangeWrapper>
      </Editor>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: #efefef;
  border-radius: 15px;
  height: 100vh;
  width: 100%;
  box-shadow: 0 8px 15px 0 rgba(black, 0.1);
  z-index: 3;
`
const Gallery = styled.div`
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: ${props =>
      `contrast(${props.contrast}%) brightness(${props.brightness}%) hue-rotate(${props.hueRotate}deg) sepia(${props.sepia}%)`};
  }
`

const ChooseFile = styled.button`
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  background: #2a4755;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 200ms ease-in;
`

const FilePicker = styled.form``

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`
const Editor = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 700px;
  padding: 20px;
  box-sizing: border-box;
  background-color: white;
  margin-top: -10px;
  z-index: 100;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.3 ease-in;
  opacity: ${props => (props.fileAdded ? '1' : '0')};
`

const RangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  & input {
    height: 2px;
    border-radius: 5px;
    outline: none;
    padding: 0;
    margin: 10px 0;
  }
`
