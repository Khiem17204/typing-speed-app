import React, { useState, useEffect } from 'react';
import './index.css';
import Logo from '../assets/favicon.png';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { logout } from './services/firebase';


export default function Header() {
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

  return (
    <header className="header">
      <img className="header--logo" src={Logo} alt="Logo" />
      <Link to="/" className="header--title">
        TypingRace
      </Link>
      {user ? (
        <>
        <Link to="/user" className="user-logo" ><i className="fa-solid fa-user"></i></Link>
        <Link onClick={handleSignOut} style={{fontSize:"x-large", display:'flex', marginRight:"10px", color:"#444444", marginTop:"auto", marginBottom:"auto", marginLeft:"15px", textDecoration:"none"}}><i className='fa-solid fa-sign-out'></i></Link>
        </>
      ) : (
        <Link to="/login" className="user-logo">
          <i className="fa-solid fa-user"></i>
        </Link>
      )}
    </header>
  );
}
