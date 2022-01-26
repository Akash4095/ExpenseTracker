import React,{useRef} from "react";
import { useNavigate } from "react-router-dom";

const EnterResetCode = () => {

    const inputResetCodeRef=useRef();
    const navigate=useNavigate()

    const resetCodeHandler=(event)=>{
        event.preventDefault();

        const enteredResetCode=inputResetCodeRef.current.value;

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyCHIcla8YTW2njhNIm1eK4axItUfhbXMgA",{
            method:'POST',
            body:JSON.stringify({
                oobCode:enteredResetCode, 
            }),
             headers: {
                "Content-Type": "application/json",
              },
        }).then(res=>{
            if(res.ok){
               alert("Verified");
               return res.json() 
            }else{
                return res.json((data)=>{
                    alert(data.error.message)
                })
            }
        }).then(
            localStorage.setItem("ObbCode",enteredResetCode),
            navigate('/createpassword')
        ).catch(err=>{
            alert(err)
        })
    }

  return (
    <div>
      <label htmlFor="resetCode">Enter Reset Code</label>
      <input
        id="resetCode"
        required
        type="text"
        ref={inputResetCodeRef}
      ></input>
      <button type="submit" onClick={resetCodeHandler}>
        Submit
      </button>
    </div>
  );
};

export default EnterResetCode;
