import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import React from 'react';

const getCloud = () => 'tung thanh nguyen la mot trong nhung nguoi thong minh va dep trai nhat the gioi, con khiem la con cho rac ruoi song o trong phong khach tung dai vao phong khiem bac ky cho'.split(' ').sort(() => Math.random > 0.5 ? 1 : -1)

function Word(props) {
  const {text, cur, correct} = props

  if(correct === true) {
    return <span className="correct">{text} </span>
  }

  if(correct === false) { 
    return <span className="incorrect">{text} </span>
  }

  if(cur) {
    return <span classname="current">{text} </span>
  }

  return <span>{text} </span>
}

Word = React.memo(Word)

function Timer(props) {
  const {correctWords, startCouting} = props
  const [timeElapsed, setTimeElapsed] = useState(0)
  useEffect(() => {
    let id;
    if(startCouting) {
      id = setInterval(() => {
        setTimeElapsed(oldTime => oldTime + 1)
      }, 1000)
    }
    return () => {
      clearInterval(id)
    }
  }, [startCouting])


  const min = timeElapsed/60

  return <div>
    <p><b>Time: {timeElapsed}</b></p>
    <p><b>Speed: {(correctWords/min).toFixed(2) || 0} WPM</b></p>
  </div>
}

function App() {

  const [userInput, setUserInput] = useState('')
  const cloud = useRef(getCloud())
  const [curWordIndex, setCurWordIndex] = useState(0)
  const [correctWord, setCorrectWord] = useState([])
  const [startCouting, setStartCounting] = useState(false)

  function processInput(value) {
    if(curWordIndex === cloud.current.length) {
      return
    }

    if(!startCouting) {
      setStartCounting(true)
    }

    if(value.endsWith(' ')) {
      if (curWordIndex === cloud.current.length - 1) {
        setStartCounting(false)
        setUserInput('Completed')
      }
      setCurWordIndex(index => index + 1)
      setUserInput('')
      
      setCorrectWord(data => {
        const word=value.trim()
        const result = [...data]
        result[curWordIndex] = word === cloud.current[curWordIndex]
        return result
      })
    
    } else {
      setUserInput(value)
    }
  }

  return (
    <div className="App">
      <h1>Tung's Typing Test</h1>
      <Timer 
        startCouting = {startCouting}
        correctWords = {correctWord.filter(Boolean).length}
      />
      <p>{cloud.current.map((word, index) => {
        
        return <Word 
                text={word}
                cur={index == curWordIndex}
                correct={correctWord[index]}
                
              />
      })}</p>
      <input 
        type="test" 
        value={userInput} 
        onChange={(e) => processInput(e.target.value)}
      />
    </div>
  );
}

export default App;
