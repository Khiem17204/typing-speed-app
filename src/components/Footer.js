import React, {useState, useEffect} from 'react'
import "./index.css"

export default function Footer() {
    return (
        <div className="footer">
            <ul>
              <li><i className="fa fa-envelope"></i> Contact</li> 
              <li><i className="fa fa-github"></i> Github</li> 
            </ul>
        </div>
    )
}