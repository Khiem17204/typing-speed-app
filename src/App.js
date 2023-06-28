
import './App.css';
import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import Body from "./components/body/Body"
import Login from "./components/Login"
import Footer from "./components/Footer"
import Result from "./components/Result"
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const login = () => setIsLoggedIn(true)
  const logout = () => setIsLoggedIn(false)

  
  
  return (
    <>
    
   <Header />
    <Body/>
    {/* <Login /> 
    <Result />
    */}
    <Footer />
    </>
  )
}


export default App;
