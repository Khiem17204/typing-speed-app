
import React, {useState, useEffect} from 'react'
import { generate } from 'random-words'

export default function Typing(props) {
    const WORDS = 103
    const [words, setWords] = useState([])
    const [currInput, setCurrInput] = useState("")
    const [currWord, setCurrWord] = useState(0)

    useEffect(() => {
        setWords(generateWords())
    }, [])


    function handleStart() {
        setWords(generateWords())
    }

    let keyCode = 0;

    const handleKeyDown = (event) => {
        keyCode = event.keyCode;
        if (keyCode == 32){
            setCurrInput([])
            setCurrWord(prevState => prevState + 1)
            setCurrIndex(-1)
            setChar("space")
        }
        else if (keyCode == 8){
            if (currInput != []){
                setCurrInput(currInput => currInput.slice(0,-1))
                setCurrIndex((index, char) => {
                    if (index >= 0){
                        return index -1
                    }
                    else{
                        return -1
                    }
                })
                setChar("backspace")
            }
            
        }
        else if (keyCode >= 65 && keyCode <= 90){
            let chrCode = keyCode - 48 * Math.floor(keyCode / 48);
            let chr = String.fromCharCode((96 <= keyCode) ? chrCode: keyCode);            
            setChar(chr.toLowerCase())
            setCurrInput(Input => [...Input, chr.toLowerCase()])
            setCurrIndex(Index => Index + 1)
        }
        
    };



    function changeColor(){

        let element = document.getElementById(`${currWord}-${currIndex}`)
        console.log(currWord, currIndex)
        // console.log(element.innerHTML)
        if (char === "backspace"){
            let element2 = document.getElementById(`${currWord}-${currIndex +1}`)
            if (element2){
                element2.className="word-unrendered"
            }
        }
        else{
            if (element){
                element.className=`word-${checkMatch(char)}`
                
            } 
        }
               
    }

    
    useEffect(() => {
        changeColor()
    }, [currInput, currIndex])


    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        console.log('A key was pressed: ', currInput, char, words[currWord]);
    }, [currInput]);
    
  

    function generateWords(n) {
        return new Array(WORDS).fill(null).map(() => generate())
    }

    function checkMatch(char){
        if (words[currWord][currIndex] === char){
            return "correct"
        }else{
            return "incorrect"
        }
        
    }
    function checkFinished(){
        if (WORDS < currWord){
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
                                    <span key={idx} id={`${i}-${idx}`} className="word-unrendered" onKeyDown={handleKeyDown}>{char}</span>
                                    {/* < Character class= */}
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