import React, { useState, useEffect } from 'react';
import './index.css';
import Logo from '../assets/favicon.png';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { logout, auth, db } from './services/firebase';
import {query, getDocs, where, addDoc, collection} from "firebase/firestore"


export default function Header() {
  const [userData, setUserData] = useState([])
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
  if (user){
    fetchData()
  }    
}, [user])


  return (
    <header className="header">
      <img className="header--logo" src={Logo} alt="Logo" />
      <Link to="/" className="header--title">
        TypingRace
      </Link>
      {user ? (
        <>
        <Link to="/user" className="user-logo" style={{textDecoration:"none"}}><i className="fa-solid fa-user"></i> <span style={{textDecoration:"none", fontSize: 18, marginLeft:"10px"}}> {userData.name}</span></Link>
        <Link onClick={handleSignOut} style={{fontSize:"x-large", display:'flex', marginRight:"10px", color:"#444444", marginTop:"auto", marginBottom:"auto", marginLeft:"15px", textDecoration:"none"}}><i className='fa-solid fa-sign-out'></i></Link>
        </>
      ) : (
        <Link to="/login" className="user-logo" style={{textDecoration:"none"}}>
          <i className="fa-solid fa-sign-in"></i>
        </Link>
      )}
    </header>
  );
}
