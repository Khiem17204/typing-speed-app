import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import Typing from './Typing';
import Controller from './Controller';
import { useNavigate } from 'react-router-dom';

export default function Body() {
    const [seconds, setTime] = useState(0);
    const [words, setWords] = useState(60);
    const normal = 60;
    const [started, setStarted] = useState(false);
    const [selectedMode, setSelectedMode] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        let interval;

        if ((started && seconds >= 0)) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime === 0) {
                        clearInterval(interval)
                        setStarted(false)
                        navigate("/result")
                        return 0
                    } else {
                        return prevTime - 1
                    }
                })
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [started, seconds])


    const handleKeyDown = (event) => {
        let keyCode = event.keyCode
        if (!started && keyCode >= 65 && keyCode <= 90) {
            setStarted(true)
        }
        window.removeEventListener('keydown', handleKeyDown)
    }
    window.addEventListener('keydown', handleKeyDown)

    const handleModeChange = (mode) => {
        setSelectedMode(mode);
    };

    useEffect(() => {
        if (selectedMode === '30s') {
            setTime(5);
            setWords(normal);
        } else if (selectedMode === '60s') {
            setTime(60);
            setWords(normal);
        } else if (selectedMode === '120s') {
            setTime(120);
            setWords(normal);
        } else if (selectedMode === '60w') {
            setTime(0);
            setWords(60);
        }
        else if (selectedMode === '120w') {
            setTime(0);
            setWords(120);
        } else if (selectedMode === '180w') {
            setTime(0);
            setWords(180);
        }
    }, [selectedMode]);

    return (
        <div className='main-content'>
            <Controller onModeChange={handleModeChange} />
            <Countdown time={seconds} onKeyDown={handleKeyDown} />
            <Typing numWords={words} />
        </div>
    );
}
