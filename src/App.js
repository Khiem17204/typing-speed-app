import './App.css';
import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import Body from "./components/body/Body"
import Login from "./components/Login"
import Footer from "./components/Footer"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const login = () => setIsLoggedIn(true)
  const logout = () => setIsLoggedIn(false)

  return (
    <>
    
   <Header />
    <Body />
    {/* <Login /> */}
    <Footer />
    </>
  );
}

export default App;
