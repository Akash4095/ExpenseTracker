import React,{useRef} from 'react';
import './Login.css'
import { useNavigate,Link } from 'react-router-dom';

const Login = (props) => {

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
            props.setLogin(true)
            navigate('/welcome')
            
        
        }).catch((err)=>{
            console.log("Something went Wrong");
        })



    }

    // const forgotPasswordHandler=(event)=>{
    //     event.preventDefault();

    //     const enteredLoginEmail= inputLoginEmailRef.current.value;

    //     fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCHIcla8YTW2njhNIm1eK4axItUfhbXMgA",{
    //         method:'POST',
    //         body:JSON.stringify({
    //             requestType:"PASSWORD_RESET",
    //             email:enteredLoginEmail,
    //         })
    //     }).then(res=>{
    //         if(res.ok){
    //             alert("Forgot Password reset email sent");
    //             return res.json();
    //         }
    //     })

    // }


  return (
  <div className='loginBody'>
  <h2>Login</h2>
      <form className='loginForm' onSubmit={loginSubmitHandler} >
          
          <input type="email" placeholder='Email' required ref={inputLoginEmailRef} />
          
          <input type="password" placeholder='Password' required ref={inputLoginPassRef}  />
          <button type="submit" className='loginBtn'>Login</button>
          <Link to="/resetpassword" >Forgot Password?</Link>
      </form>
  </div>
    );
};

export default Login;
