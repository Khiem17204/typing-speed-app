import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "./index.css"

export default function Footer() {
    return (
        <div className="footer">                          
              <Link to="mailto:ktle@umass.edu" target="_blank" style={{textDecoration:"none", color:"#5d5757", marginRight:"50px", marginLeft:"20px"}}><i className="fa fa-envelope"></i> Contact</Link>
              <Link to="https://github.com/Khiem17204/typing-speed-app" target="_blank" style={{textDecoration:"none", color:"#5d5757", marginRight:"50px"}}><i className="fa fa-github"></i> Github</Link> 
        </div>
    )
}