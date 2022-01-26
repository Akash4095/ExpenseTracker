import React,{useRef} from 'react';
import './ProfilePage.css'

const ProfilePage = (props) => {

    const fullNameRef=useRef();
    const profileUrlRef=useRef();


    const profileUpdateHandler=(event)=>{
        event.preventDefault();

        const enteredFullName=fullNameRef.current.value;
        const enteredProfileUrl=profileUrlRef.current.value;
        const TokenId=localStorage.getItem("TokenIDExpense")
        
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCHIcla8YTW2njhNIm1eK4axItUfhbXMgA",{
            method:'POST',
            body:JSON.stringify({
               idToken:TokenId,
               displayName:enteredFullName,
               photoUrl: enteredProfileUrl,
               returnSecureToken:true,
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>{
            if(res.ok){
                alert("Profile Updated");
                return res.json();
            }else{
                return res.json((data)=>{
                    alert(data.error.message)
                })
            }
        })

    }


  return (
    <div className='profile'>
        <form onSubmit={profileUpdateHandler} className='form'>
           <h2>Contact Details</h2> 
           <label htmlFor="fullName">FullName:</label>
           <input type="text" id='fullName' required ref={fullNameRef}  placeholder={props.inputName} />
           <label htmlFor="profileURL">Profile Photo Url:</label>
           <input type="text" id='profileURL' required ref={profileUrlRef} placeholder={props.inputUrl} />
           <button type='submit'>Update</button>
        </form>
    </div>
  );
};

export default ProfilePage;
