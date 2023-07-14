import React, { useState, useEffect } from 'react';
import './index.css';
import Logo from '../assets/favicon.png';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Header() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <header className="header">
      <img className="header--logo" src={Logo} alt="Logo" />
      <Link to="/" className="header--title">
        TypingRace
      </Link>
      {user ? (
        <Link to="/user" className="user-logo">
          <i className="fa-solid fa-user"></i>
        </Link>
      ) : (
        <Link to="/login" className="user-logo">
          <i className="fa-solid fa-user"></i>
        </Link>
      )}
    </header>
  );
}
