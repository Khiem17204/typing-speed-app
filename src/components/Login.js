import React from 'react'
import {useState, useEffect} from 'react'
import Header from './Header'

export default function Login() {

return (
    <div className="auth">
        <div className="register">
            <h4>Register</h4>
            
                <input className="register-box" placeholder='username'></input>
                <input className="register-box" placeholder='email'></input>
                <input className="register-box" placeholder='verify email'></input>
                <input className="register-box" placeholder='password'></input>
                <input className="register-box" placeholder='verify password'></input>
                <button className="auth-button"><i class="fa fa-user-plus"></i> <span>Sign Up</span> </button><br></br>
            
        </div>
        <div className="login">
            <h4>Login</h4>
            <input className="register-box" placeholder='email'></input>
            <input className="register-box"placeholder='password'></input><br></br>
            <input type="checkbox" id="remember-me" className="remember-me"></input>
            <label for="remember-me">Remember me</label>
            <button className="auth-button"><i class="fa fa-sign-in"></i> <span>Sign In</span></button><br></br>
            <p style={{marginLeft:"110px"}}> or </p>
            <button className="auth-button"><i class="fa fa-google"></i> Google Sign In</button><br></br>

        </div>
    </div>
)

}