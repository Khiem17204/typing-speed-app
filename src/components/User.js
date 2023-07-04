import React from 'react'
import photo from "../assets/favicon.png"

export default function User() {
    return (
        <div className='user'>
            <div className='user-info'>
                <div className='username'>
                    <div className='user-photo'>
                        <img src = {photo} className ="circle-photo"/>
                    </div>
                    <div className='user-name'>
                        <h5>Username</h5>
                        <h6>Joined MM/DD/YY</h6>
                    </div>
                </div>
                <div className='test-started'>
                    <ul>
                        <li>
                             <h4>Test Started</h4>
                             <h3>0</h3>
                        </li>
                        <li>
                             <h4>Test Started</h4>
                             <h3>0</h3>
                        </li>
                        <li>
                             <h4>Test Started</h4>
                             <h3>0</h3>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='user-stat'>
                <div className='date-nav'>
                    <ul>
                        <li>Filters</li>
                        <li className='date-nav-black'>Day</li>
                        <li className='date-nav-black'>Week</li>
                        <li className='date-nav-black'>Month</li>
                        <li className='date-nav-black'>All</li>
                    </ul>
                </div>
                <div className='mode-data'>
                    <ul>
                        <li>
                            <h5>Mode 1</h5>
                            <h3>.....</h3>
                            <h3>.....</h3>
                            <h3>.....</h3>
                        </li>
                        <li>
                            <h5>Mode 1</h5>
                            <h3>.....</h3>
                            <h3>.....</h3>
                            <h3>.....</h3>
                        </li><li>
                            <h5>Mode 1</h5>
                            <h3>.....</h3>
                            <h3>.....</h3>
                            <h3>.....</h3>
                        </li><li>
                            <h5>Mode 1</h5>
                            <h3>.....</h3>
                            <h3>.....</h3>
                            <h3>.....</h3>
                        </li>
                    </ul>
                </div>
                <div className='share-button'>
                    <button>Share</button>
                </div>
            </div>
        </div>
    )
}