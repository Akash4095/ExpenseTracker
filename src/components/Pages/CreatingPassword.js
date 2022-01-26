import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const CreatingPassword = () => {

    const inputCreatePassRef = useRef();
    const inputCreateConfirmPassRef = useRef();
    const navigate = useNavigate();

    const createPassHandler = (event) =>{
        event.preventDefault()

        const enteredNewPass = inputCreatePassRef.current.value;
        if(enteredNewPass!==inputCreateConfirmPassRef.current.value){
            alert("Confirm Password is different")
            return 
        }

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyCHIcla8YTW2njhNIm1eK4axItUfhbXMgA",{
            method:'POST',
            body: JSON.stringify({
                obbCode: localStorage.getItem('ObbCode'),
                newPassword: enteredNewPass
            }),
            headers:{
                'Contetnt-Type': 'application/json'
            }
        }).then(res=>{
            if(res.ok){
                alert("Password Created Successfully")
                return res.json();
            }
            else{
                return res.json((data)=>{
                    alert(data.error.message)
                })
            }
        }).then(
            navigate('/login')
        )
    }


    return (
        <div>
            <input type="password" required placeholder="Password" ref={inputCreatePassRef}></input>
            <input type="password" required placeholder="Confirm Password" ref={inputCreateConfirmPassRef}></input>
            <button type="submit" onClick={createPassHandler}>Change Password</button>
        </div>
    )
}

export default CreatingPassword;