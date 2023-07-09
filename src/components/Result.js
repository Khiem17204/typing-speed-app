import React from 'react'
import photo from "../assets/image.png"

export default function Result() {
    return (
        <div className='result'>
            <div className='summary'>
                <div className='vertical-stat'>
                    <div className='wpm'>
                        <h3>wpm</h3>
                        <h1>50</h1>
                    </div>
                    <div className='acc'>
                        <h3>acc</h3>
                        <h1>93%</h1>
                    </div>
                </div>
                <div className='graph'>
                    <img src = {photo}/>
                </div>
            </div>
            <div className='horizontal-stat'>
                <ul className='stat-list'> 
                    <li className='stat'>
                        <h5>test type</h5>
                        <h6>time 30</h6>
                        <h6>english</h6>

                    </li>
                    <li className='stat'>
                        <h5>raw</h5>
                        <h4>58</h4>
                    </li>
                    <li className='stat'>
                        <h5>characters</h5>
                        <h4>124/7/0/0</h4>
                    </li>
                    <li className='stat'>
                        <h5>consistency</h5>
                        <h4>57%</h4>
                    </li>
                    <li className='stat'>
                        <h5>time</h5>
                        <h4>30s</h4>
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