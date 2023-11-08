import React, { useEffect } from 'react'
import './CSS/Adminlogin.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const obj={
    username:'',
    password:''
}
const Adminlogin = () => {
    const navigate=useNavigate();
    const [data, setData] = useState(obj);
    const [admin, setAdmin] = useState({});
    const handleSignin=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    useEffect(() => {
        if(JSON.parse(localStorage.getItem("Admin"))){
            navigate('/adminpanel');
        }
    }, [])
    const checkSignin=async(e)=>{
        e.preventDefault();
        const {username,password}=data;
        if(username && password){
            const res=await fetch('/adminlogin',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
            // .then(res=>res.json())
            // .then(data=>console.log(data));
            if(res.status==200){
                const data1=await res.json().then(data=>{
                   setAdmin(data); 
                   localStorage.setItem("Admin",JSON.stringify(data));
                });
                
                navigate('/adminpanel');
                
            }
        }
        else{
            alert("Please fill email and password");
        }
        
    }
    return (
        <div className="container abc row d-flex justify-content-center">
        <div className="row">
            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-6 col-md-8 login-box">
                <div className="col-lg-12 login-key">
                    <i className="fa fa-key" ></i>
                </div>
                <div className="col-lg-12 login-title">
                    ADMIN LOGIN
                </div>

                <div className="col-lg-12 login-form">
                    <div className="col-lg-12 login-form">
                        <form>
                            <div className="form-group">
                                <label className="form-control-label adminLabel">USERNAME</label>
                                <input onChange={handleSignin} type="text" className="form-control adminText" placeholder="Enter Username" name="username" required />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label adminLabel">PASSWORD</label>
                                <input onChange={handleSignin} type="password" className="form-control adminPass" placeholder="Enter Password" name="password" required />
                            </div>

                            <div className="col-lg-12 loginbttm">
                                <div className="col-lg-6 login-btm login-text">
                                </div>
                                <div className="col-lg-6 login-btm login-button">
                                <button onClick={checkSignin} type="submit" className="btn btn-outline-primary">LOGIN</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-3 col-md-2"></div>
            </div>
        </div>
    </div>
        
            

    //     <form>  
    //     <div className="container">   
    //         <label>Username : </label>   
    //         <input onChange={handleSignin} type="text" placeholder="Enter Username" name="username" required/>  
    //         <label>Password : </label>   
    //         <input onChange={handleSignin} type="password" placeholder="Enter Password" name="password" required/>  
    //         <br />
    //         <Link to='/adminpanel'><button onChange={checkSignin} id='text-center' type="submit">Login</button></Link>   
            
    //     </div>   
    // </form>
    )
}

export default Adminlogin
