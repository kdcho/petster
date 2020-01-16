import React, { useRef, useState } from 'react'
import styled from 'styled-components/macro'

export default function PictureUpload({ image, upload }) {
  const fileInput = useRef()
  const [fileAdded, setFileAdded] = useState(false)

  const [contrast, setContrast] = useState(100)
  const [brightness, setBrightness] = useState(100)
  const [sepia, setSepia] = useState(0)

  return (
    <Container>
      <Gallery
        id="gallery"
        contrast={contrast}
        brightness={brightness}
        sepia={sepia}
      >
        <ButtonWrapper fileAdded={fileAdded}>
          <ChooseFile type="button" onClick={() => fileInput.current.click()}>
            Foto auswählen
          </ChooseFile>
        </ButtonWrapper>
        {image ? (
          <img src={image} alt="profile" />
        ) : (
          <input
            type="file"
            name="file"
            style={{ display: 'none' }}
            ref={fileInput}
            accept="image/*"
            onChange={event => {
              upload(event)
              setFileAdded(!fileAdded)
            }}
          />
        )}
      </Gallery>
      <Editor>
        <p>
          Hier kannst du dein Bild vor dem hochladen noch bearbeiten. Sobald du
          fertig bist kannst du speichern.
        </p>
        <RangeWrapper fileAdded={fileAdded}>
          <label htmlFor="contrast">Contrast</label>
          <input
            onChange={event => setContrast(event.target.value)}
            name="contrast"
            type="range"
            value={contrast || '100'}
            min="0"
            max="200"
          />
        </RangeWrapper>
        <RangeWrapper fileAdded={fileAdded}>
          <label htmlFor="brightness">Brightness</label>
          <input
            onChange={event => setBrightness(event.target.value)}
            name="brightness"
            type="range"
            value={brightness || '100'}
            min="0"
            max="200"
          />
        </RangeWrapper>
        <RangeWrapper fileAdded={fileAdded}>
          <label htmlFor="sepia">Sepia</label>
          <input
            onChange={event => setSepia(event.target.value)}
            name="sepia"
            type="range"
            value={sepia || '0'}
            min="0"
            max="200"
          />
        </RangeWrapper>
      </Editor>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 280px auto;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: #2a4755;
  height: 100vh;
  width: 100%;
  z-index: 2;
`
const Gallery = styled.div`
  display: flex;
  justify-self: center;
  width: 240px;
  height: 240px;
  margin: 20px;
  border: 10px solid #5389a4;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2), 0 0 0rem rgba(0, 0, 0, 0.2);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: ${props =>
      `contrast(${props.contrast}%) brightness(${props.brightness}%) sepia(${props.sepia}%)`};
  }
`

const ButtonWrapper = styled.div`
  display: ${props => (props.fileAdded ? 'none' : 'block')};
  align-self: center;
  margin: 0 auto;
  overflow: hidden;
  cursor: pointer;
`

const ChooseFile = styled.button`
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  background: #efefef;
  color: #000;
  font-size: 16px;
  cursor: pointer;
`
const Editor = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  max-width: 768px;
  padding: 20px;
  background-color: #efefef;
  transition: all 0.3s ease-in;
`

const RangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  opacity: ${props => (props.fileAdded ? '1' : '0')};
  input[type='range'] {
    background: #efefef;
    height: 26px;
    -webkit-appearance: none;
    margin: 10px 0;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 14px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #50555c;
    background: #50555c;
    border-radius: 14px;
    border: 0px solid #000000;
  }
  input[type='range']::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 20px;
    width: 40px;
    border-radius: 12px;
    background: #529de1;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -3px;
  }
  input[type='range']:focus::-webkit-slider-runnable-track {
    background: #50555c;
  }
  input[type='range']::-moz-range-track {
    width: 100%;
    height: 14px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #50555c;
    background: #50555c;
    border-radius: 14px;
    border: 0px solid #000000;
  }
  input[type='range']::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 20px;
    width: 40px;
    border-radius: 12px;
    background: #529de1;
    cursor: pointer;
  }
`
