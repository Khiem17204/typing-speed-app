import photo from "../assets/favicon.png"
import React, { useState, useEffect } from 'react';
import './index.css';
import Logo from '../assets/favicon.png';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import Identicon from "identicon.js";
import {query, getDocs, where, addDoc, collection} from "firebase/firestore"
import { auth, db } from "./services/firebase";


export default function User() {
    const [user, loading, error] = useAuthState(auth);
    // const [user, setUser] = useState(null);
    const navigate = useNavigate();
    if (!user){
        navigate("/login")        
    }
    const [userData, setUserData] = useState([])
    
    const fetchData = async () => {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid))
        await getDocs(q)
            .then((snapshot) => {
                const newData = snapshot.docs[0].data();
                setUserData(newData);
                console.log(userData);
            })
    }

    useEffect(()=> {
        fetchData()
    }, [user])
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         setUser(user);
    //         if (!user){
    //             navigate("/login")
    //         }
    //     });

    //     // Cleanup function
    //     return () => {
    //         unsubscribe();
    //     };
    // }, [auth]);
    
        var data = new Identicon(user?.uid).toString()
        var icon = "data:image/png;base64," + data;
    
     

    return (

        <div className='user'>
            <div className='user-info'>
                <div className='username'>
                    <div className='user-photo'>
                        <img src={icon} className="circle-photo" />

                    </div>
                    <div className='user-name'>
                        <h5>{userData.name}</h5>
                        <h6>Joined {userData.joined} </h6>
                    </div>
                </div>
                <div className='test-started'>
                    <ul>
                        <li>
                            <h4>Test Started</h4>
                            <h3>0</h3>
                        </li>
                        <li>
                            <h4>Test Started</h4>
                            <h3>0</h3>
                        </li>
                        <li>
                            <h4>Test Started</h4>
                            <h3>0</h3>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='user-stat'>
                <div className='date-nav'>
                    <ul>
                        <li>Filters</li>
                        <li className='date-nav-black'>Day</li>
                        <li className='date-nav-black'>Week</li>
                        <li className='date-nav-black'>Month</li>
                        <li className='date-nav-black'>All</li>
                    </ul>
                </div>
                <div className='mode-data'>
                    <ul>
                        <li>
                            <h5>Mode 1</h5>
                            <h3>.....</h3>
                            <h3>.....</h3>
                            <h3>.....</h3>
                        </li>
                        <li>
                            <h5>Mode 1</h5>
                            <h3>.....</h3>
                            <h3>.....</h3>
                            <h3>.....</h3>
                        </li><li>
                            <h5>Mode 1</h5>
                            <h3>.....</h3>
                            <h3>.....</h3>
                            <h3>.....</h3>
                        </li><li>
                            <h5>Mode 1</h5>
                            <h3>.....</h3>
                            <h3>.....</h3>
                            <h3>.....</h3>
                        </li>
                    </ul>
                </div>
                <div className='share-button'>
                    <button>Share</button>
                </div>
            </div>
        </div>
    )
}