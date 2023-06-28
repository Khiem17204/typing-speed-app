import React from 'react'
import {useState, useEffect} from 'react'
import './index.css'
import Logo from "../assets/favicon.png"
import { Link } from "react-router-dom";
export default function Header() {
    return (
        <header className="header">
            <img className="header--logo" src = {Logo} />
            <Link to="/" className="header--title"> TypingRace</Link>
            <Link to="/login" className='user-logo'><i class="fa-solid fa-user"></i></Link>
        </header>
    )
}