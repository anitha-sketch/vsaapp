import React from 'react'
import './home.css'
import nature from '../assets/img.jpg'
import { FaFacebook } from "react-icons/fa";

function Home(){

    return(
        <div>
            <h1 className='home'>home</h1>
            <p style={{color:"red",fontSize:"30px"}}>dswfc</p>
            <img src='https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8='/>
<img src={nature}/>
<FaFacebook  style={{width:"300px",color:"red",height:"300px"}}/>
        </div>
    )
}
export default Home;