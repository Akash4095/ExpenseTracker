import React from "react"
import {Link, useNavigate} from "react-router-dom";
import './Header.css'

const Header=(props)=>{

    const navigate=useNavigate();

    const logoutHandler=()=>{
        localStorage.removeItem("TokenIDExpense")
        props.setLogin(false)
        navigate('/login')
    }

    return(
        <div className="header">
            <nav className="nav">
                <Link to="/" className="home" >SignUp</Link>
                <Link to="login" >Login</Link>

               {props.login && <button className="btn" onClick={logoutHandler} >Logout</button>}

            </nav>
        </div>
    )
}

export default Header;