import React, { useRef, useState } from 'react'
import styled from 'styled-components/macro'

export default function PictureUpload() {
  const fileInput = useRef()
  const [fileAdded, setFileAdded] = useState(false)

  const [contrast, setContrast] = useState(100)
  const [brightness, setBrightness] = useState(100)
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
      <Gallery
        id="gallery"
        contrast={contrast}
        brightness={brightness}
        sepia={sepia}
      ></Gallery>
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
      <Editor fileAdded={fileAdded}>
        <RangeWrapper>
          <label htmlFor="contrast">Contrast</label>
          <input
            onChange={event => setContrast(event.target.value)}
            /* onMouseOver={event => setContrast(event.target.value)} */
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
            /* onMouseOver={event => setBrightness(event.target.value)} */
            name="brightness"
            type="range"
            min="0"
            max="200"
          />
        </RangeWrapper>
        <RangeWrapper>
          <label htmlFor="sepia">Sepia</label>
          <input
            onChange={event => setSepia(event.target.value)}
            /* onMouseOver={event => setSepia(event.target.value)} */
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
      `contrast(${props.contrast}%) brightness(${props.brightness}%) sepia(${props.sepia}%)`};
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
  margin: 20px;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`
const Editor = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #efefef;
  margin-top: -10px;
  transform: translateY(50px);
  transition: all 0.3 ease-in;
  opacity: ${props => (props.fileAdded ? '1' : '0')};
`

const RangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  input[type='range'] {
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
