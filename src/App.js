import React,{useState,useEffect} from "react";

import { Routes, Route } from "react-router-dom";
import SignUp from "./components/Pages/SignUp";
import WelcomePage from "./components/Pages/WelcomePage";
import Login from "./components/Pages/Login";
import Header from "./components/Layout/Header";
import ProfilePage from "./components/Pages/ProfilePage";
import PasswordReset from "./components/Pages/PasswordReset";
import EnterResetCode from "./components/Pages/EnterResetCode";
import CreatingPassword from "./components/Pages/CreatingPassword";
import EditExpense from "./components/Expenses/EditExpense";
import { useDispatch } from "react-redux";
import { authActions } from "./store/authReducer";

function App() {

  const [displayName,setDisplayName]=useState('');
  const [photoUrl,setPhotoUrl]=useState('')
  const dispatch = useDispatch();

  useEffect(()=>{

    if(localStorage.getItem("TokenIDExpense")){
      dispatch(authActions.login())
      fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA5nYjPCDidltvXYlAkGXzCUR0CIOQBAOo",{
      method:'POST',
      body:JSON.stringify({
        idToken:localStorage.getItem("TokenIDExpense")
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res=>{
      if(res.ok){
        return res.json();
      }else{
        return res.json((data)=>{
          throw new Error(data.error.message)
        })
      }
    }).then((data)=>{
      setDisplayName(data.displayName);
      setPhotoUrl(data.photoUrl)
    }).catch((err)=>{
      alert(err)
    })
  }

  },[dispatch])

  return (
    <>
      <Header  />
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/welcome" element={<WelcomePage />} />
        <Route exact path="/login" element={<Login  />} />
        <Route exact path="/completeprofile" element={<ProfilePage inputName ={displayName} inputUrl ={photoUrl} />} />
        <Route exact path = "/resetpassword" element = {<PasswordReset/>}/>
        <Route exact path = "/enterrestcode" element = {<EnterResetCode/>}/>
        <Route exact path = "/createpassword" element = {<CreatingPassword/>}/>
        <Route exact path = '/editexpense/:id' element = {<EditExpense/>}/>
      </Routes>
      
      
    </>
  );
}

export default App;
