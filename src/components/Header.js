import React from 'react'
import {useState, useEffect} from 'react'
import './index.css'
import Logo from "../assets/favicon.png"

export default function Header() {
    return (
        <header className="header">
            <img className="header--logo" src = {Logo} />
            <h1 className="header--title"> TypingRace</h1>
        </header>
    )
}