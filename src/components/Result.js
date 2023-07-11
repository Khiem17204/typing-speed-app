import React from 'react'
import { redirect, useLocation } from 'react-router-dom'
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


ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)  

export default function Result() {
    const location = useLocation();
    const wpm = Math.floor(((location.state.allTypeEntries/5) - location.state.unCorrectedError)/(location.state.seconds/60))
    const acc = Math.floor((location.state.correctChar/location.state.allTypeEntries) * 100)
    const raw = Math.floor((location.state.allTypeEntries/5)/(location.state.seconds/60))
    console.log(resultdata.labels)
    console.log(resultdata.w)
    const data = {
        labels: resultdata.labels,
        datasets: [{
            data: resultdata.wpm,
            backgroundColor: "aqua",
            borderColor: 'white',
            pointBorderColor: 'aqua',
        }]
    }
    const options = {
        plugins: {
            lengend: true
        },
        scales: {
            x: {
                min:1
            },
            y: {
                max: 80,
            }
        
        },
    }
    return (
        <div className='result'>
            <div className='summary'>
                <div className='vertical-stat'>
                    <div className='wpm'>
                        <h3>wpm</h3>
                        <h1>{wpm}</h1>
                    </div>
                    <div className='acc'>
                        <h3>acc</h3>
                        <h1>{acc}%</h1>
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
                <p><a href='google.com' class="grey-sign-in">Sign in</a> to save your result</p>
                <div className='icon'>
                    <a href="/home" class="icon-block"><i class="fa-solid fa-angle-right"></i></a>
                    <a href="/home" class="icon-block"><i class="fa-solid fa-arrows-rotate"></i></a>
                    <a href="/home" class="icon-block"><i class="fa-solid fa-triangle-exclamation"></i></a>
                    <a href="/home" class="icon-block"><i class="fa-solid fa-angles-left"></i></a>
                    <a href="/home" class="icon-block"><i class="fa-solid fa-image"></i></a>
                </div>
            </div>
        </div>
    )
}