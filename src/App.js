
import './App.css';
import React, {useState, useEffect} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Body from "./components/body/Body"
import Login from "./components/Login"
import Footer from "./components/Footer"
import Result from "./components/Result"
import User from "./components/User"

import Loading from "./components/common/Loading"
import ProtectedRoute from "./components/ProtectedRoute"
function App() {    
    return (
      <BrowserRouter>
        <Loading/>
        <Header />
        <Routes>
          <Route path="/" element={<Body/>} exact/>
          <Route path="/login" element={<Login/>} />
          <Route path="/result" element={<Result/>} />
          <Route exact path='/user' element={<ProtectedRoute/>}>
            <Route exact path='/user' element={<User/>}/>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }



  export default App;
