//content.js
import React, {useState, useEffect} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useLocation} from "react-router-dom";
import {auth, db} from "./services/firebase"
import {collection, getDocs, updateDoc, addDoc, query, where, doc} from "firebase/firestore"
import "./index.css"

export default function UserEdit({ close }){
    const [userData, setUserData] = useState([])
    // const [trigger, setTrigger] = useState(false)
    const [user, loading, error] = useAuthState(auth)
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

    const sendData = async () => {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid))
        var id = null
        var data = null
        await getDocs(q)
            .then((snapshot) => {
                id = snapshot.docs[0].id;
                data = snapshot.docs[0].data();
        })
        const userDoc = doc(db, "users", id)
        for (const mode of ["name", "image", "bio", "github", "twitter", "website"]){
            const element = document.getElementById("update-"+mode).value
            if (element != ""){
                if(data.hasOwnProperty(mode)){
                    data[mode] = element
                }else{data[mode] = element}
                await updateDoc(userDoc, data)                
            }
        }
        window.location.reload(false)
    }



    return (
        <div className="update-info">
            <a className="close" onClick={close}>
            &times;
            </a>
            <div style={{padding:"20px", fontFamily:"'Roboto Mono', monospace", fontSize: 25, borderBottomColor: 'red', borderBottomWidth: 2,}}>
                Edit Profile
            </div>
            <div className="title">username</div>
            <input className="info-box" placeholder='username' id="update-name"></input>
            <div className="title">image</div>
            <input className="info-box" placeholder='image-url' type='url' id="update-image"></input><br></br>
            <div className="title">bio</div>
            <textarea className="bio" id="update-bio"></textarea>
            <div className="title">github</div>
            <span><span style={{marginLeft:"20px", color:"white", fontFamily:"'Roboto Mono', monospace", fontSize: "15px",}}>https://github.com/</span><input className="info-box" placeholder="userid" id="update-github"></input> </span>
            <div className="title">twitter</div>
            <span><span style={{marginLeft:"20px", color:"white", fontFamily:"'Roboto Mono', monospace", fontSize: "15px",}}>https://twitter.com/</span><input className="info-box" placeholder="userid" id="update-twitter"></input> </span>
            <div className="title">website</div>
            <input className="info-box" placeholder="website" id="update-website"></input>
            <button className = "submit-button" onClick={sendData}>Save</button>
        </div>
    )
  }