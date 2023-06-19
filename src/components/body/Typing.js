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

    function generateWords(n) {
        return new Array(WORDS).fill(null).map(() => generate())
    }

    function handleKeyDown({keyCode}){
if(keyCode === 32){
    setCurrInput("")
    setCurrWord(prevState => prevState + 1)
    checkMatch()
}
    }
    function checkMatch() {
        const wordToCompare = words[currWord]
        // return wordToCompare === currInput.trim()
        console.log(wordToCompare === currInput.trim())
    }
    return (
        <div>
            <div className='typing--section'>
                <div className="prompt"> 
                        {words.map((word, i) =>  (<span key={i}> 
                        <span >
                            {word.split("").map((char, idx) => (
                                <>
                                <span key={idx}>{char}</span>
                                
                                </>
                                
                            ))}
                            <span> </span>
                        </span>
                        </span>
                        )
                        )}
{/* {JSON.stringify(words)} */}
                </div>
                <div className="input--section">
                    <input className="input"  placeholder="Start Typing" onKeyDown={handleKeyDown} value={currInput} onChange={(event) => setCurrInput(event.target.value)}/>
                </div>
            </div>
        </ div>
    )

}