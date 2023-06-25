import React from 'react'
import {useState, useEffect} from 'react'
import Countdown from './Countdown'
import Typing from './Typing'

export default function Body() {
    const [seconds, setTime] = useState(60)
    const [started, setStarted] = useState(false)


    function countdown() {
        setStarted(prevStart => !prevStart)
        let interval = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime === 0){
                        clearInterval(interval)
                    }
                    else{

                       return prevTime -1
                    }
                    })
            }, 1000)
        }
    return (
        <>
            <Countdown time={seconds} />
            {/* <button className="button--start" onClick={countdown}> Start </button> */}
            <Typing />
        </>
    )
}