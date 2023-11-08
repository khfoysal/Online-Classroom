import React from 'react'
import '../Components/CSS/Signin.css'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const obj={
    email:'',
    password:''
}
const Signin = ({updateUser}) => {
    const navigate=useNavigate();
    const [msg, setMsg] = useState('');
    const [data, setData] = useState(obj);
    const [res1,setRes]=useState({});
    useEffect(() => {
        setRes(JSON.parse(localStorage.getItem("MyUser")));
        
      }, []);
    const handleSignin=(e)=>{

        setData({...data,[e.target.name]:e.target.value})
    }
    const checkSignin=async(e)=>{
        e.preventDefault();
        const {email,password}=data;
        if(email && password){
           const res= await fetch('/usersignin',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })

            // .then(response => response.json())
            // .then(data=> setRes(data));
        
            
            
            if(res.status===200){
                
                const data1=await res.json().then(data=>{
                    setRes(data);
                   updateUser(data); 
                });
                
                navigate('/');
                
                // setRes({"first":"invalid"});
                
                // window.alert("Invalid login");
            }
            else{
                toast.error('Invalid login!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    });
                console.log("ok bye");
                // window.alert("Login Successfull");
            }
            
           
        }
        else{
            alert("Please fill email and password");
        }
    }
    return (
        <>
        <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
<div className="signin">


            <div className="wrapper fadeInDown">
  <div id="formContent">
     {res1 ? <h1> {res1.first}</h1>: <></>}
    
    <form>
      <input onChange={(e)=>handleSignin(e)} type="text" id="login" className="fadeIn second signinText" name="email" placeholder="Email"/>
      <input onChange={(e)=>handleSignin(e)} type="password" id="password" className="fadeIn third signinPass" name="password" placeholder="password"/>
      <input onClick={checkSignin}  type="submit" className="fadeIn fourth" value="Log In"/>
    </form>

  </div>
</div>
</div>
</>
    )
}

export default Signin
