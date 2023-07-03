import React, { useState, useEffect } from 'react'
import { generate } from 'random-words'
import { toBeChecked } from '@testing-library/jest-dom/matchers'

export default function Typing({ numWords }) {
    const [words, setWords] = useState([])
    const [currInput, setCurrInput] = useState([])
    const [char, setChar] = useState("")
    const [currWord, setCurrWord] = useState(0)
    const [currIndex, setCurrIndex] = useState(-1)

    useEffect(() => {
        for (let i = 0; i<= currWord; i++){
            for (let j = 0; j <= words[currWord]?.length; j++){
                let element = document.getElementById(`${i}-${j}`)
                if (element){
                    element.className = "word-unrendered"
                }
            }
        }
        setWords(generateWords())
        setCurrWord(0)
        setCurrIndex(-1)
        setChar("")
        
    }, [numWords])

    function generateWords(n) {
        return new Array(numWords).fill(null).map(() => generate())
    }

    let keyCode = 0;

    const handleKeyDown = (event) => {
        keyCode = event.keyCode;
        if (keyCode === 32) {
            setCurrInput([])
            setCurrWord(prevState => prevState + 1)
            setCurrIndex(-1)
            setChar("space")
        }
        else if (keyCode === 8) {
            if (currInput !== []) {
                setCurrInput(currInput => currInput.slice(0, -1))
                setCurrIndex((index) => {
                    if (index >= 0) {
                        return index - 1
                    }
                    else {
                        return -1
                    }
                })
                setChar("backspace")
            }

        }
        else if (keyCode >= 65 && keyCode <= 90) {
            let chrCode = keyCode - 48 * Math.floor(keyCode / 48);
            let chr = String.fromCharCode((96 <= keyCode) ? chrCode : keyCode);
            setChar(chr.toLowerCase())
            setCurrInput(Input => [...Input, chr.toLowerCase()])
            setCurrIndex(Index => Index + 1)
        }

    };


    function injectExtraWords(words, currIndex, currWord, currInput, char) {
        let space = document.createElement("span")
        space.appendChild(
            document.createTextNode(" "))
        if (char !== "backspace" && currIndex >= words[currWord]?.length) {

            let element = document.createElement("span");
            element.key = currIndex + 1
            element.id = `${currWord}-${currIndex}`
            element.className = "word-incorrect"
            element.onKeyDown = "handleKeyDown"

            element.appendChild(
                document.createTextNode(`${currInput[currInput.length - 1]}`)
            )
            document.getElementById(currWord).removeChild(document.getElementById(currWord).lastChild)
            document.getElementById(currWord).appendChild(element)
            document.getElementById(currWord).appendChild(space)



        }
        else if (char === "backspace" && currIndex >= words[currWord]?.length - 1) {
            document.getElementById(currWord).removeChild(document.getElementById(currWord).lastChild)
            document.getElementById(currWord).removeChild(document.getElementById(currWord).lastChild)
            document.getElementById(currWord).appendChild(space)

        }

    }



    function changeColor() {

        let element = document.getElementById(`${currWord}-${currIndex}`)
        console.log(currWord, currIndex)
        // console.log(element.innerHTML)
        if (char === "backspace") {
            let element2 = document.getElementById(`${currWord}-${currIndex + 1}`)
            if (element2) {
                element2.className = "word-unrendered"
            }
        }
        else {
            if (element) {
                element.className = `word-${checkMatch(char)}`

            }
        }

    }

    useEffect(() => {

        injectExtraWords(words, currIndex, currWord, currInput, char)


    }, [currInput])

    useEffect(() => {
        changeColor()
    }, [currInput])


    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

 
    useEffect(() => {
        console.log('A key was pressed: ', currInput, char, words[currWord], currIndex);
    }, [currInput]);


    function checkMatch(char) {
        if (currIndex >= words[currWord].length){
            return "redundant"
        }

        if (words[currWord][currIndex] === char) {
            return "correct"
        } else {
            return "incorrect"
        }
    }


    return (
        <div>
            <div className='typing--section'>
                <div className="prompt">
                    {words.map((word, i) => (<span key={i} id={`${i}`}>

                        {word.split("").map((char, idx) => (
                            <>
                                <span key={idx} id={`${i}-${idx}`} className="word-unrendered" onKeyDown={handleKeyDown}>{char}</span>
                                {/* < Character class= */}
                            </>

                        ))}
                        <span> </span>

                    </span>
                    )
                    )}
                </div>
            </div>
        </ div>
    )

}