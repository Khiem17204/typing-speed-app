import {React, useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import photo from "../assets/image.png"
import {Line} from "react-chartjs-2"
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js';
import resultdata from './resultdata'
import {auth, db} from './services/firebase'
import {doc,
        collection,
        addDoc,
        getDocs,
        query,
        updateDoc,
        where, array} from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
)  

export default function Result() {
    const location = useLocation();
    const wpm = Math.max(Math.floor(((location.state.allTypeEntries/5) - location.state.unCorrectedError)/(location.state.seconds/60)), 0)
    const acc = Math.floor((location.state.correctChar/location.state.allTypeEntries) * 100)
    const raw = Math.floor((location.state.allTypeEntries/5)/(location.state.seconds/60))
    const [user, loading, error] = useAuthState(auth);
    console.log(resultdata.labels)
    console.log(resultdata.w)
    const data = {
        labels: resultdata.labels,
        datasets: [{
            data: resultdata.wpm,
            backgroundColor: "#557D8D",
            borderColor: '#557D8D',
            pointBorderColor: '#557D8D',
            fill: true,
            backgroundColor: "#557D8D"
            
        }]
    }  
    const options = {
        responsive: true,
        maintainAspectRatio:false,
        plugins: {
            lengend: true,
            labels: {
                color: 'rgb(255, 99, 132)'
            }
        },
        scales: {
            x: {
                min:1
            },
            y: {
                max: Math.floor(Math.max(...resultdata.wpm)/10) * 10 + 10,
                min: 0
            }
        
        },
        elements: {
            line: {
                tension: 0.3
            }
        }
    }

    const sendData = async () => {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid))
        var id = null
        var mode = location.state.type
        var data = null
        await getDocs(q)
            .then((snapshot) => {
                id = snapshot.docs[0].id;
                data = snapshot.docs[0].data();
        })
        const userDoc = doc(db, "users", id)
        if(data.hasOwnProperty(mode)){
            data[mode].push(wpm)
        }else{data[mode] = [wpm]} 

        await updateDoc(userDoc, data)
    }
    useEffect(() => {
        if (user){
            sendData()
        }
    }, [user])
    return (
        <div className='result'>
            <div className='summary'>
                <div className='vertical-stat'>
                    <div className='wpm'>
                        <h3>wpm</h3>
                        <h1 style={{color:"#557D8D"}}>{wpm}</h1>
                    </div>
                    <div className='acc'>
                        <h3>acc</h3>
                        <h1 style={{color:"#557D8D"}}>{acc}%</h1>
                    </div>
                </div>
                <div className='graph'>
                    <Line  
                        data = {data}
                        options = {options}
                    ></Line>
                </div>
            </div>
            <div className='horizontal-stat'>
                <ul className='stat-list'> 
                    <li className='stat'>
                        <h5>test type</h5>
                        <h6>{location.state.type}</h6>
                        <h6> english</h6>
                    </li>
                    <li className='stat'>
                        <h5>raw</h5>
                        <h4>{raw}</h4>
                    </li>
                    <li className='stat'>
                        <h5>characters</h5>
                        <h4>{`${location.state.correctChar}/${location.state.unCorrectedError}`}</h4>
                    </li>
                    <li className='stat'>
                        <h5>consistency</h5>
                        <h4>57% </h4>
                    </li>
                    <li className='stat'>
                        <h5>time</h5>
                        <h4>{`${location.state.seconds}s`}</h4>
                    </li>
                </ul>
            </div>
            <div className='text'>
                {!user ? <p><a href='/login' class="grey-sign-in">Sign in</a> to save your result</p> : ""}
                <div className='icon'>
                    <a href="/" class="icon-block"><i class="fa-solid fa-angle-right"></i></a>
                    <a href="/" class="icon-block"><i class="fa-solid fa-arrows-rotate"></i></a>
                    <a href="/" class="icon-block"><i class="fa-solid fa-triangle-exclamation"></i></a>
                    <a href="/" class="icon-block"><i class="fa-solid fa-angles-left"></i></a>
                    <a href="/" class="icon-block"><i class="fa-solid fa-image"></i></a>
                </div>
            </div>
        </div>
    )
}