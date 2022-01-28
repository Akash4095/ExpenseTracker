import React,{useState,useRef} from 'react';
import './SignUp.css'
import VerifyEmail from './VerifyEmail';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate=useNavigate();

    const [isVerify,setIsVerify]=useState(false);

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
                setIsVerify(true)
                navigate('/login')
                return res.json()
            }
            else{
                return res.json().then(data => {
                    console.log(data.error.message)
                    alert(data.error.message)
                })
            }
        }).then((data)=>{
            let id=data.idToken;
            fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCHIcla8YTW2njhNIm1eK4axItUfhbXMgA",{
                method:'POST',
                body:JSON.srtingify({
                    requestType:"VERIFY_EMAIL",
                    idToken:id,
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(res=>{
                if(res.ok){

                    console.log("Otp sent");
                }else{
                    return res.json().then(data=>{
                        alert("somehing went wrong")
                    })
                }
            })
        })

    }




  return (
        <div className='signupBody'>
            <h2>SignUp</h2>
            <form className='signUpform' onSubmit={submitHandler}>
                <input type="email" placeholder='Email' ref={inputEmailRef} required/><br />
                <input type="password" placeholder='Password' ref={inputPassRef} required  /><br />
                <input type="password" placeholder='Confirm Password' ref={inputConfirmPassRef} required /><br />

                <button className='signupBtn' type='submit'>SignUp</button>
            </form>

            <div className="verifyOtp">
                {/* {isVerify && <VerifyEmail verify={setIsVerify}/>} */}
            </div>
        </div>
    );
};

export default SignUp;
