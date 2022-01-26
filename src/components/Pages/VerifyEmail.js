import React,{useRef} from 'react';

const VerifyEmail = () => {

    const  inputOtpRef=useRef();

    const verifySubmitHandler=(event)=>{
        event.preventDefault();
        const enteredOtp=inputOtpRef.current.value;

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCHIcla8YTW2njhNIm1eK4axItUfhbXMgA",{
            method:'POST',
            body:JSON.stringify({
                oobCode:enteredOtp,
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res=>{
            if(res.ok){
                console.log('succesfully verified');
                alert('succesFully verified')

                return res.json();
            }
            else{
                return res.json().then(data=>{
                    console.log(data.error.message);
                    alert(data.error.message)
                })
            }
        })
    }



  return (
      <div>
          <form onSubmit={verifySubmitHandler} >
              <label htmlFor="verify">Please enter OTP to verify Email </label>
              <input type="text" id='verify'  />
              <button type="submit">Submit</button>
          </form>
      </div>
  );
};

export default VerifyEmail;
