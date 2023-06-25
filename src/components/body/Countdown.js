import React from 'react'
import {useState, useEffect} from 'react'
import "../index.css"

export default function Countdown (props) {
    return (
        <>
            <div className="countdown-timer">{props.time} </div>
        </>
    )
}