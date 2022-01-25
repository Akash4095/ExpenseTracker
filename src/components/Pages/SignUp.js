import React,{useState,useRef} from 'react';
import './SignUp.css'

const SignUp = () => {

    const inputEmailRef = useRef();
    const inputPassRef = useRef();
    const inputConfirmPassRef = useRef();

    const submitHandler = (event)=>{
        event.preventDefault();

        const enteredEmail = inputEmailRef.current.value;
        const enteredPassword = inputPassRef.current.value;

        if(enteredPassword!==inputConfirmPassRef.current.value){
            alert("Confirm Password is not Same");
            return;
        }

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHIcla8YTW2njhNIm1eK4axItUfhbXMgA",{
            method: 'POST',
            body:JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
              }),
              headers:{
                'Content-Type': 'application/json'
              }
        }).then(res=>{
            if(res.ok){

                console.log('Successfully Registered')
                alert('Successfully Registered')
            }
            else{
                return res.json().then(data => {
                    console.log(data.error.message)
                    alert(data.error.message)
                })
            }
        })

    }




  return (
        <div className='signupBody'>
            <h2>SignUp</h2>
            <form onSubmit={submitHandler}>
                <input type="email" placeholder='Email' ref={inputEmailRef} required/>
                <input type="password" placeholder='Password' ref={inputPassRef} required  />
                <input type="password" placeholder='Confirm Password' ref={inputConfirmPassRef} required />

                <button className='signupBtn' type='submit'>SignUp</button>
            </form>
        </div>
    );
};

export default SignUp;
