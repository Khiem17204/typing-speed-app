import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import Typing from './Typing';
import Controller from './Controller';
import Countword from './Countword';

import {auth, db} from '../services/firebase'
import {doc,
        collection,
        addDoc,
        getDocs,
        query,
        updateDoc,
        where, array} from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";

import { useNavigate } from 'react-router-dom';
export default function Body() {
    const [seconds, setTime] = useState(15);
    const [words, setWords] = useState(25);
    const normal = 25;
    const [ended,setEnded] = useState(false);
    const [started, setStarted] = useState(false);
    const [selectedMode, setSelectedMode] = useState('15s');
    const [currWord, setCurrWord] = useState(1)
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const sendData = async () => {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid))
        var id = null
        var data = null
        await getDocs(q)
            .then((snapshot) => {
                id = snapshot.docs[0].id;
                data = snapshot.docs[0].data();
        })
        const userDoc = doc(db, "users", id)
        
        if(data.hasOwnProperty("started")){
            data["started"] = data["started"] +1
        }else{data["started"] =1}
        await updateDoc(userDoc, data)
    }
    useEffect(() => {
        if (user && started){
            sendData()
        }
    }, [user])

    useEffect(() => {
        let interval;
        if ((started && seconds >= 0 && selectedMode.endsWith("s"))) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime === 0) {
                        clearInterval(interval)
                        setStarted(false)        
                        setEnded(true)              
                        return 0
                    }         
                    return prevTime - 1;
                })
            }, 1000)
        }
        else if ((started && selectedMode.endsWith("w"))) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime +1)
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
        if (keyCode === 32){
            setCurrWord(prev => prev + 1)
        }
        // window.removeEventListener('keydown', handleKeyDown)
    }
    // window.addEventListener('keydown', handleKeyDown)
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currWord]);

    const handleModeChange = (mode) => {
        setSelectedMode(mode);
    };

    useEffect(() => {
        if (selectedMode === '15s') {
            setTime(15);
            setWords(normal);
        } else if (selectedMode === '30s') {
            setTime(30);
            setWords(normal);
        } else if (selectedMode === '45s') {
            setTime(45);
            setWords(normal);
        } else if (selectedMode === '25w') {
            setTime(1);
            setWords(25);
        }
        else if (selectedMode === '50w') {
            setTime(1);
            setWords(50);
        } else if (selectedMode === '100w') {
            setTime(1);
            setWords(100);
        }
    }, [selectedMode]);

    return (
        <div className='main-content'>
            {!started && <Controller onModeChange={handleModeChange} />}
            {selectedMode.endsWith("w") ? <Countword word={currWord} totalWord={words} onKeyDown={handleKeyDown}/> : <Countdown time={seconds} onKeyDown={handleKeyDown} />}
            <Typing numWords={words} seconds={seconds} selectedMode={selectedMode} started={started} ended={ended} mode={selectedMode.endsWith("w") ? "word" : "time"} />
        </div>
    );
}
 