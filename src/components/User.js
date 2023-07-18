import photo from "../assets/favicon.png"
import React, { useState, useEffect } from 'react';
import Popup from "reactjs-popup";
import {Line} from "react-chartjs-2"
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js';
import './index.css';
import Logo from '../assets/favicon.png';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import Identicon from "identicon.js";
import {query, getDocs, where, addDoc, collection} from "firebase/firestore"
import { auth, db, showLoading, hideLoading } from "./services/firebase";
import UserEdit from "./UserEdit"
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
)

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

    var hash = "142857" + user?.uid + "eebe560242" + user?.uid+"ac120002";  // 15+ hex chars
    var data = new Identicon(hash).toString()
    const database1 = userData["best-wpm time 15s"]
    var dataset = null
    var options = null
    if (userData){
        dataset = {
            labels: userData["best-labels time 15s"],
            datasets: [{
                label: "Best 15s",
                data: userData["best-wpm time 15s"],
                backgroundColor: "#557D8D",
                borderColor: '#557D8D',
                pointBorderColor: '#557D8D',
                pointRadius:2,
                borderWidth: 1.5,
            },
            {
                data: userData["best-wpm time 30s"],
                backgroundColor: "#557D8D70",
                borderColor: '#557D8D70',
                pointBorderColor: '#557D8D70',
                pointRadius:2,
                borderWidth: 1.5,
            },
            {
                data: userData["best-wpm time 45s"],
                backgroundColor: "##557D8D40",
                borderColor: '##557D8D40',
                pointBorderColor: '#557D8D40',
                pointRadius:2,
                borderWidth: 1.5,
            },
            {
                data: userData["best-wpm word 25w"],
                backgroundColor: "#FF7A90",
                borderColor: '#FF7A90',
                pointBorderColor: '#FF7A90',
                pointRadius:2,
                borderWidth: 1.5,
            },
            {
                data: userData["best-wpm word 50w"],
                backgroundColor: "#FF7A9070",
                borderColor: '#FF7A9070',
                pointBorderColor: '#FF7A9070',
                pointRadius:2,
                borderWidth: 1.5,
            },
            {
                data: userData["best-wpm word 100w"],
                backgroundColor: "#FF7A9040",
                borderColor: '#FF7A9040',
                pointBorderColor: '#FF7A9040',
                pointRadius:2,
                borderWidth: 1.5,
            }
        ]
        }
        options = {
            responsive: true,
            maintainAspectRatio:false,
            tooltip: {
                mode: 'index',
                intersect: false
                },
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
                labels: {
                    color: 'rgb(255, 99, 132)'
                }
            },
            hover: {
                mode: 'nearest',
                intersect: true
              },
            scales: {
                x: {
                    min:1
                },
                y: {
                    max: 130,
                    min: 0
                }

            },
            elements: {
                line: {
                    tension: 0.3
                }
            }
        }
    }



    return (
        <div className='user'>
            <div className='user-info'>
                <div className='username'>
                    <div className='user-photo'>
                        <img src={userData.image != null ? userData.image : "data:image/png;base64," + data} className="circle-photo" />

                    </div>
                    <div className='user-name'>
                        <h2>{userData.name}</h2>
                        <h6>Joined {userData.joined} </h6>
                    </div>
                </div>
                <div className='test-started'>
                    <ul>
                        <li>
                            <h5 style={{fontSize:12, color:"#bcc0d2", marginBottom:"0px"}}>test started</h5>
                            <div style={{fontSize: 30, color: "white"}}>{userData.started != null ? userData.started : 0}</div>
                        </li>
                        <li>
                            <h5 style={{fontSize:12, color:"#bcc0d2", marginBottom:"0px"}}>test completed</h5>
                            <div style={{fontSize: 30, color: "white"}}>{userData.completed != null ? userData.completed : 0}</div>
                        </li>
                        <li>{userData.bio != null ? <><h5 style={{fontSize:13, color:"#bcc0d2", marginBottom:"5px"}}>userbio</h5><div style={{fontSize: 12, color: "white"}}>{userData.bio}</div></>: ""}</li>
                        <li>{userData.github != null ? <><h5 style={{fontSize:13, color:"#bcc0d2", marginBottom:"0px"}}>github</h5><div style={{fontSize:12, color: "white"}}>github.com/{userData.github}</div></>: ""}</li>
                        <li>{userData.twitter != null ? <><h5 style={{fontSize:13, color:"#bcc0d2", marginBottom:"0px"}}>twitter</h5><div style={{fontSize:15, color: "white"}}>@{userData.twitter}</div></>: ""}</li>
                        <li>{userData.website != null ? <><h5 style={{fontSize:13, color:"#bcc0d2", marginBottom:"0px"}}>website</h5><div style={{fontSize:12, color: "white"}}>{userData.website}</div></>: ""}</li>
                    </ul>
                    <Popup modal trigger={<button class="update-info-on"><i className="fa-solid fa-pen" ></i></button>} overlayStyle={{ background: 'rgba(0, 0, 0, 0.6)' }}>
                                {close => <UserEdit close={close}  />}
                    </Popup>
                </div>
            </div>
            <div>
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
                                    <h5 style={{fontSize:13, margin:"10px"}}>15 seconds</h5>
                                    <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:45, margin:"10px"}}>{userData["time 15s"] ? Math.max(...userData["time 15s"]) : "-"}</h3>
                                    <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:20, margin:"10px", color:"#bcc0d2"}}>{userData["time 15s"] ? Math.max(...userData["time 15s"]) + "%" : "-"}</h3>
                                </li>
                                <li>
                                    <h5 style={{fontSize:13, margin:"10px"}}>30 seconds</h5>
                                    <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:45, margin:"10px"}}>{userData["time 30s"] ? Math.max(...userData["time 30s"]) : "-"}</h3>
                                    <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:20, margin:"10px", color:"#bcc0d2"}}>{userData["time 15s"] ? Math.max(...userData["time 15s"]) + "%" : "-"}</h3>

                                </li><li>
                                    <h5 style={{fontSize:13, margin:"10px"}}>45 seconds</h5>
                                    <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:45, margin:"10px"}}>{userData["time 45s"] ? Math.max(...userData["time 45s"]) : "-"}</h3>
                                    <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:20, margin:"10px", color:"#bcc0d2"}}>{userData["time 15s"] ? Math.max(...userData["time 15s"]) + "%" : "-"}</h3>
                                </li>
                            </ul>
                        </div>
                        <div className="mode-data-blocks">
                            <ul>
                                <li>
                                    <h5 style={{fontSize:13, margin:"10px"}}>25 words</h5>
                                    <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:45, margin:"10px"}}>{userData["word 25w"] ? Math.max(...userData["word 25w"]) : "-"}</h3>
                                    <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:20, margin:"10px", color:"#bcc0d2"}}>{userData["time 15s"] ? Math.max(...userData["time 15s"]) + "%" : "-"}</h3>
                                </li><li>
                                    <h5 style={{fontSize:13, margin:"10px"}}>50 words</h5>
                                    <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:45, margin:"10px"}}>{userData["word 50w"] ? Math.max(...userData["word 50w"]) : "-"}</h3>
                                    <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:20, margin:"10px", color:"#bcc0d2"}}>{userData["time 15s"] ? Math.max(...userData["time 15s"]) + "%" : "-"}</h3>
                                </li><li>
                                    <h5 style={{fontSize:13, margin:"10px"}}>100 words</h5>
                                    <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:45, margin:"10px"}}>{userData["word 100w"] ? Math.max(...userData["word 100w"]) : "-"}</h3>
                                    <h3 style={{fontFamily:"Roboto, sans-serif", fontSize:20, margin:"10px", color:"#bcc0d2"}}>{userData["time 15s"] ? Math.max(...userData["time 15s"]) + "%" : "-"}</h3>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="user-best-chart">
                <div style={{textAlign:"center", color:"#444444"}}>personal best for all modes</div>
                {userData != null ? <Line
                        data = {dataset}
                        options = {options}
                    ></Line> : " "}
                </div>
            </div>

    </div>
    )
}