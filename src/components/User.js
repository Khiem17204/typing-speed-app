import photo from "../assets/favicon.png"
import React, { useState, useEffect } from 'react';
import Popup from "reactjs-popup";
import './index.css';
import Logo from '../assets/favicon.png';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import Identicon from "identicon.js";
import {query, getDocs, where, addDoc, collection} from "firebase/firestore"
import { auth, db, showLoading, hideLoading } from "./services/firebase";
import UserEdit from "./UserEdit"


export default function User() {
    const [user, loading, error] = useAuthState(auth);
    // const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading){
            showLoading();
        }else{
            hideLoading();
        }

        if (!user) {
            hideLoading();
            navigate("/login")
        }
        if (error){
            console.log(error)
        }
    }, [loading,user,error,navigate])
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
    
    var hash = "55ec514c239e11" + user?.uid + "eebe560242" + user?.uid + "ac120002";  // 15+ hex chars
    var data = new Identicon(hash).toString()
    var icon = "data:image/png;base64," + data;
    
     

    return (
        <div className='user'>
            <div className='user-info'>
                <div className='username'>
                    <div className='user-photo'>
                        <img src={icon} className="circle-photo" />

                    </div>
                    <div className='user-name'>
                        <h2>{userData.name}</h2>
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
                            <h4>Test Completed</h4>
                            <h3>0</h3>
                        </li>
                    </ul>
                    <Popup modal trigger={<button><i className="fa-solid fa-pen"></i></button>}>
                                {close => <UserEdit close={close} />}
                            </Popup>
                </div>
            </div>
            <div className='user-stat'>
                <div className='date-nav'>
                    <ul>
                        <li style={{color:"#557D8D"}}>filters</li>
                        <li className='date-nav-black'>day</li>
                        <li className='date-nav-black'>week</li>
                        <li className='date-nav-black'>month</li>
                        <li className='date-nav-black'>all</li>
                    </ul>
                </div>
                <div className='mode-data'>
                    <div className='mode-data-blocks'>
                        <ul>
                            <li>
                                <h5 style={{fontSize:13}}>15 seconds</h5>
                                <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:30}}>{userData["time 15s"] ? Math.max(...userData["time 15s"]) : "-"}</h3>
                            </li>
                            <li>
                                <h5 style={{fontSize:13}}>30 seconds</h5>
                                <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:30}}>{userData["time 30s"] ? Math.max(...userData["time 30s"]) : "-"}</h3>
                                
                            </li><li>
                                <h5 style={{fontSize:13}}>45 seconds</h5>
                                <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:30}}>{userData["time 45s"] ? Math.max(...userData["time 45s"]) : "-"}</h3>                            
                            </li>
                        </ul>
                    </div>
                    <div className="mode-data-blocks">
                        <ul>
                            <li>
                                <h5 style={{fontSize:13}}>25 words</h5>
                                <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:30}}>{userData["word 25w"] ? Math.max(...userData["word 25w"]) : "-"}</h3>
                            </li><li>
                                <h5 style={{fontSize:13}}>50 words</h5>
                                <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:30}}>{userData["word 50w"] ? Math.max(...userData["word 50w"]) : "-"}</h3>
                            </li><li>
                                <h5 style={{fontSize:13}}>100 words</h5>
                                <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:30}}>{userData["word 100w"] ? Math.max(...userData["word 100w"]) : "-"}</h3>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}