import React from 'react'
import { useState, useEffect } from 'react'
import { registerWithEmailAndPassword, auth, logInWithEmailAndPassword, signInWithGoogle, showLoading, hideLoading } from "./services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

export default function Login() {
    const navigate = useNavigate()
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        if (loading){
            showLoading();
        }else{
            hideLoading();
        }

        if (user) {
            hideLoading();
            navigate("/user")
        }
        if (error){
            console.log(error)
        }
    }, [loading,user,error,navigate])


    //register
    const [regeEmail, setRegeEmail] = useState("");
    const [regePassword, setRegePassword] = useState("");
    const [regeName, setRegeName] = useState("");

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    const register = () => {
        if (!regeName) alert("Please enter name");
        if (!regeEmail) alert("Please enter email")
        if (!regePassword) alert("Please enter password")
        registerWithEmailAndPassword(regeName, regeEmail, regePassword);
    };

    //login
    const signinViaMail = () => {
        if (!email) alert("Please enter email");
        if (!password) alert("Please enter password");
        logInWithEmailAndPassword(email, password);
        // if (user){
        //     navigate("/user")
        // }
    };

    return (

        <div className="auth">
            <div className="register">
                <h4>Register</h4>
                
                <input className="register-box" placeholder='username' value={regeName} onChange={(e) => setRegeName(e.target.value)} ></input>    
                <input className="register-box" placeholder='email' value={regeEmail} onChange={(e) => setRegeEmail(e.target.value)}></input>
                <input className="register-box" placeholder='verify email'></input>
                {/* add basic verification if not match */}

                <input className="register-box" placeholder='password' value={regePassword} onChange={(e) => setRegePassword(e.target.value)} type='password'></input>
                <input className="register-box" placeholder='verify password' type='password'></input>
                {/* add basic verification if not match */}
                <button className="auth-button" onClick={register}><i class="fa fa-user-plus"></i> <span>Sign Up</span> </button><br></br>

            </div>
            <div className="login">
                <h4>Login</h4>
                <input className="register-box" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input className="register-box" placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br>
                <input type="checkbox" id="remember-me" className="remember-me"></input>
                <label for="remember-me">Remember me</label>
                <button className="auth-button" onClick={signinViaMail}><i class="fa fa-sign-in" ></i> <span>Sign In</span></button><br></br>
                <p style={{ marginLeft: "110px" }}> or </p>
                <button className="auth-button" onClick={signInWithGoogle}><i class="fa fa-google"></i> Google Sign In</button><br></br>

            </div>
        </div>
    )

}