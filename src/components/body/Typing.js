import React, { useState, useEffect } from 'react'
import { generate } from 'random-words'

export default function Typing({ props }) {
    const WORDS = 103
    const [words, setWords] = useState([])
    const [currInput, setCurrInput] = useState("")
    const [currWord, setCurrWord] = useState(2)

    useEffect(() => {
        setWords(generateWords())
    }, [])

    const handleKeyDown = (event) => {
        let keyCode = event.keyCode;
        let chrCode = keyCode - 48 * Math.floor(keyCode / 48);
        let chr = String.fromCharCode((96 <= keyCode) ? chrCode: keyCode);
        
        setCurrInput(chr.toLowerCase())
        
      };
    
      useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);

      useEffect(() => {
        console.log('A key was pressed: ' + currInput);
      }, [currInput]);
    
  

    function generateWords(n) {
        return new Array(WORDS).fill(null).map(() => generate())
    }

    function checkMatch(i, idx, input){
        if (words[i][idx] === input){
            return "correct"
        }else{
            return "incorrect"
        }
        
    }
    function checkTyped(i,idx){
        if (i < currWord){
            return true
        }
        return false
    }
    // function handleKeyDown({ keyCode }) {
    //     if (keyCode === 32) {
    //         setCurrInput("")
    //         setCurrWord(prevState => prevState + 1)
    //         checkMatch()
    //     }
    // }
    // function checkMatch() {
    //     const wordToCompare = words[currWord]
    //     // return wordToCompare === currInput.trim()
    //     console.log(wordToCompare === currInput.trim())
    // }
    return (
        <div>
            <div className='typing--section'>
                <div className="prompt">
                    {words.map((word, i) => (<span key={i}>
                        <span >
                            {word.split("").map((char, idx) => (
                                <>
                                    <span key={idx} className={'word-'+(checkMatch(i,idx,currInput))}>{char}</span>

                                </>

                            ))}
                            <span> </span>
                        </span>
                    </span>
                    )
                    )}
                </div>
            </div>
        </ div>
    )

}