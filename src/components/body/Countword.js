import React from "react";
import {useState, useEffect} from "react";

export default function Countword(props){
    return (
        <> 
            <div className="countdown-timer">{props.word}/{props.totalWord} </div>
        </>
    )
}