import React,{useRef} from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const inputLoginEmailRef=useRef();
    const inputLoginPassRef=useRef();
    let navigate=useNavigate();

    const loginSubmitHandler=(event)=>{
        event.preventDefault();

        const enteredLoginEmail= inputLoginEmailRef.current.value;
        const enteredLoginPass= inputLoginPassRef.current.value;

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHIcla8YTW2njhNIm1eK4axItUfhbXMgA",{
            method:"POST",
            body:JSON.stringify({
                email:enteredLoginEmail,
                password:enteredLoginPass,
                returnSecureToken:true,
            })
        }).then(res=>{
            if(res.ok){
                console.log("Login Succes");
                alert("Login succes")
                return res.json();
            }else{
                return res.json().then(data=>{
                    alert(data.error.message)
                    throw new Error(data.error.message)
                })
            }
        }).then((data)=>{
            localStorage.setItem('TokenIDExpense',data.idToken)
            navigate('/welcome')
        
        }).catch((err)=>{
            console.log("Something went Wrong");
        })


    }


  return (
  <div className='loginBody'>
      <form className='loginForm' onSubmit={loginSubmitHandler} >
          <label htmlFor="loginEmail">Email:</label>
          <input type="email" id='loginEmail' required ref={inputLoginEmailRef} />
          <label htmlFor="loginPass">Password:</label>
          <input type="text" id='loginPass' required ref={inputLoginPassRef}  />
          <button type="submit" className='loginBtn'>Login</button>
      </form>
  </div>
    );
};

export default Login;
