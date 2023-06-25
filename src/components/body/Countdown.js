import React from 'react'
import {useState, useEffect} from 'react'
import "../index.css"

export default function Countdown (props) {
    return (
        <>
            <div className={props.class}>{props.time} </div>
        </>
    )
}