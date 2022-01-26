import React,{useState,useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/Pages/SignUp";
import WelcomePage from "./components/Pages/WelcomePage";
import Login from "./components/Pages/Login";
import Header from "./components/Layout/Header";
import ProfilePage from "./components/Pages/ProfilePage";

function App() {

  const [displayName,setDisplayName]=useState('');
  const [photoUrl,setPhotoUrl]=useState('')
  const [isLogin,setIsLogin]=useState(false);

  useEffect(()=>{

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCHIcla8YTW2njhNIm1eK4axItUfhbXMgA",{
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

  },[])

  return (
    <>
      <Header login={isLogin} setLogin={setIsLogin} />
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/welcome" element={<WelcomePage />} />
        <Route exact path="/login" element={<Login setLogin={setIsLogin} />} />
        <Route exact path="/completeprofile" element={<ProfilePage inputName ={displayName} inputUrl ={photoUrl} />} />
      </Routes>
      
    </>
  );
}

export default App;
