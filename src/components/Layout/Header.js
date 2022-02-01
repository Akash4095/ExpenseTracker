import React from "react"
import {Link, useNavigate} from "react-router-dom";
import './Header.css'
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/authReducer";

const Header=(props)=>{

    const islogin = useSelector(state=> state.auth.isAuthenticated)
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const logoutHandler=()=>{
        localStorage.removeItem("TokenIDExpense")
        dispatch(authActions.logout())
        navigate('/login')
    }

    return(
        <div className="header">
            <nav className="nav">
                <Link to="/" className="home" >SignUp</Link>
                <Link to="login" >Login</Link>

                {islogin && <button onClick={logoutHandler} className="btn" type="button">Logout</button>}

            </nav>
        </div>
    )
}

export default Header;