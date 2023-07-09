
import './App.css';
import React, {useState, useEffect} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Body from "./components/body/Body"
import Login from "./components/Login"
import Footer from "./components/Footer"
import Result from "./components/Result"
import User from "./components/User"

function App() {
  
    
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Body/>} exact/>
          <Route path="/login" element={<Login/>} />
          <Route path="/result" element={<Result/>} />
          <Route path='/user' element ={<User/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }


  export default App;
