import React from 'react'
import './Add.css'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Addfaculty = () => {
  const navigate=useNavigate();
  const [admindetails, setAdminDetails] = useState({
    ins:"",
    createby:""
  })
  useEffect(() => {
    if(JSON.parse(localStorage.getItem("Admin"))){
      setAdminDetails({
        ins:JSON.parse(localStorage.getItem("Admin")).institute,
        createby:JSON.parse(localStorage.getItem("Admin")).username
      })
    }
  }, [])
  const dataObj={
    first:'',
    last:'',
    email:'',
    department:'',
    password:'',
    institute:JSON.parse(localStorage.getItem("Admin")).institute,
    createdBy:JSON.parse(localStorage.getItem("Admin")).username,
    imageURL:"https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-User-essential-collection-bearicons-glyph-bearicons.png",
    role:'faculty',
    createDate:new Date()
  }
  const [post, setPost] = useState(dataObj);
  

  const handleChange=(e)=>{
     
    setPost({...post,[e.target.name]:e.target.value})
    console.log(post);
//     setPost({post.institute:JSON.parse(localStorage.getItem("Admin")).institute,
//   post.createdBy:JSON.parse(localStorage.getItem("Admin")).username})
// console.log(post);
  }

  const savePost=async(e)=>{
     e.preventDefault();
    const {first,last,email,password,department}=post;
    
    if(first && last && email && password && department){
      const res= await fetch('/adduser',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(post)
    })
    if(res.status===201){
      console.log("User Exists");
      toast.info('User already registered!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
    }
    else{
      navigate('/adminpanel');
    }
    
    }
    else{
      alert("Please fill all the fields");
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
            <div className="text-dark stbg">
               
                <div className="box1">
                    <h2>Add Faculty</h2>
                    <form>

    <div className="form-group">
    <label htmlFor="exampleInputEmail1">First Name</label>
    <input onChange={(e)=>handleChange(e)} name='first' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="First Name" autoComplete='off' required/>
    
  </div>

  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Last Name</label>
    <input onChange={(e)=>handleChange(e)} name='last' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Last Name" required/>
    
  </div>

  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input onChange={(e)=>handleChange(e)} name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required/>
   
  </div>

  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Department</label>
    <input onChange={(e)=>handleChange(e)} name='department' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Department" required/>
   
  </div>


  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input onChange={(e)=>handleChange(e)} name='password' type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required/>
  </div>

  

  <button onClick={savePost} type="submit" className="btn btn-primary">Add User</button>
</form>
                </div>
            </div>

        </>
    )
}

export default Addfaculty
