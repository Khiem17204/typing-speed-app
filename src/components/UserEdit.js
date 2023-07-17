//content.js
import React from "react";
import "./index.css"

export default function UserEdit({ close }){
    return (
        <div className="modal">
            <a className="close" onClick={close}>
            &times;
            </a>
            <div className="header"> Modal Title </div>
            <div className="content">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
            Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
            delectus doloremque, explicabo tempore dicta adipisci fugit amet
            dignissimos?
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
            commodi beatae optio voluptatum sed eius cumque, delectus saepe
            repudiandae explicabo nemo nam libero ad, doloribus, voluptas rem alias.
            Vitae?
            </div>
        </div>
    )
  }