import React, {useState, useEffect} from 'react'
import { generate } from 'random-words'

export default function Typing(props) {
    const WORDS = 103
    const [words, setWords] = useState([])
    const [charInput, setCharInput] = useState([])

    // const [currInput, setCurrInput] = useState("")

    const [charIndex, setCharIndex] = useState(0)
    const [currWord, setCurrWord] = useState(0)
    const [lastComplete, setLastComplete] = useState(-1)

    useEffect(() => {
        setWords(generateWords())
    }, [])

    function generateWords(n) {
        return new Array(WORDS).fill(null).map(() => generate())
    }

    function handleKeyDown({keyCode}){
    if(keyCode === 32){
        if (checkMatch()){
            setLastComplete(currWord)
        }
        // setCurrInput("")
        setCurrWord(prevState => prevState + 1)
    }
    else if (keyCode === 8) {
        if (charIndex === 0 && lastComplete < currWord -1){
            setCurrWord(prevState => prevState -1)
            
        }
    }

    // backspace & else

}
    function handleChange(){
        return 
}
    function checkMatch() {
        const wordToCompare = words[currWord]
        //  TODO : rewrite this funciton
        console.log(wordToCompare === currInput.trim())
    }
    return (
        <div>
            <div className='typing--section'>
                <div className="prompt"> 
                        {words.map((word, i) =>  (<span key={i}> 
                        
                            {word.split("").map((char, idx) => (
                                <>
                                <span key={idx}>{char}</span>
                                
                                </>
                                
                            ))}
                            <span> </span>
                        </span>
                        )
                        )}
{/* {JSON.stringify(words)} */}
                </div>
                <div className="input--section">
                    <input className="input"  placeholder="Start Typing" onKeyDown={handleKeyDown} value={currInput} onChange={handleChange}/>
                </div>
            </div>
        </ div>
    )

}
// onChange={(event) => setCurrInput(event.target.value)}