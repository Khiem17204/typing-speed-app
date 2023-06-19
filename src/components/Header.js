import React from 'react'
import {useState, useEffect} from 'react'
import './index.css'

export default function Header() {
    return (
        <header className="header">
            <h1 className="header--title">Typing Speed App</h1>
            <ul className="header--nav">
                <li> Home</li>
                <li> About</li>
                <li> Start</li>
            </ul>
        </header>
    )
}