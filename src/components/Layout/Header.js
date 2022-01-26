import React from "react"
import {Link} from "react-router-dom";
import './Header.css'

const Header=()=>{
    return(
        <div className="header">
            <nav className="nav">
                <Link to="/" className="home" >Home</Link>
                <Link to="login" >Login</Link>

            </nav>
        </div>
    )
}

export default Header;