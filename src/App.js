<<<<<<< HEAD
import { useState,useEffect } from "react"
import {generate} from "random-words"
const NUMB_OF_WORDS = 100
const SECONDS = 30

function App() {
  const [words,setWords] = useState([])
  const [time,setTime] = useState(SECONDS)
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [currentInput,SetcurrentInput] = useState("")
  const [currWordIndex,setCurrWordIndex] = useState(0)
  const[correct,setCorrect] = useState(0)
  const [incorrect,setIncorrect] = useState(0)
  const [currentCharIndex,setCurrentCharIndex] = useState(-1)
  const [currentCharCorrect,setCurrentCharCorrect] = useState(0)
  const [currentCharIncorrect,setCurrentCharIncorrect] = useState(0)

  useEffect(() => {
    setWords(generateWords())  
  },[])

  function generateWords() { 
    return new Array(NUMB_OF_WORDS).fill(null).map(() => generate())
}
  function start() {
    if (!countdownStarted) {
      setCountdownStarted(true);
    
      let interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(interval)
          }
          else {
            return prevTime - 1
          }
      } )
        },1000)
    }      
  }
  function handleKeyDown({keyCode}) {
    if(keyCode===32) {
      checkMatch()
      SetcurrentInput("")
      setCurrWordIndex(currWordIndex+1)
      setCurrentCharIndex(-1)
    }
    else {
    checkCharMatch()
    setCurrentCharIndex(currentCharIndex+1)
    }   
  }
  function checkMatch() {
    const wordToCompare = words[currWordIndex]
    const doesItMatch = wordToCompare === currentInput.trim()
    if (doesItMatch) {
      setCorrect(correct+1)
    }
    else {
      setIncorrect(incorrect+1)
    }
  }
  function checkCharMatch() {
    const charToCompare = words[currWordIndex].charAt(currentCharIndex)
    const doesItMatch = charToCompare === (currentInput.trim()).charAt(currentCharIndex)

    if (doesItMatch) {
      setCurrentCharCorrect(prevCharCorrect => prevCharCorrect+1)
    }
    else {
      setCurrentCharIncorrect(preCharIncorrect => preCharIncorrect+1)
    }
  }
  return (
    <div className ="App">
      <input type="text" onInput={start} onKeyDown ={handleKeyDown} value={currentInput} onChange={(e) => SetcurrentInput(e.target.value)}></input>
      <button>Restart</button>
      <h3>{time}</h3>
      <div className="section">
        {words.map((words,i) => (
          <span key ={i}>
            <span>
            {words.split("").map((char,idx) => (
              <span key={idx}>{char}</span>
            ))}
            </span>
            <span> </span>
          </span>
        ))}
       </div>
       <p> Word Correct: {correct}</p>
       <p> Accuracy : {currentCharCorrect/(currentCharCorrect+currentCharIncorrect)*100} %</p>
    </div>
=======
import './App.css';
import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import Body from "./components/body/Body"
import Login from "./components/Login"
import Footer from "./components/Footer"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const login = () => setIsLoggedIn(true)
  const logout = () => setIsLoggedIn(false)

  
  
  return (
    <>
    
   <Header />
    <Body/>
    {/* <Login /> */}
    <Footer />
    </>
>>>>>>> origin/main
  );

}


export default App;
