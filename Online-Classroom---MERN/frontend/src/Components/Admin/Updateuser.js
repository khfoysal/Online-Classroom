import React from 'react'
import './Add.css'
import { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router';
const dataObj={
  first:'',
  last:'',
  email:'',
  department:'',
  password:'',
  role:'faculty',
  createDate:new Date()
}

const Updateuser = () => {
  const navigate=useNavigate();
  let {id}=useParams();
  const [post, setPost] = useState(dataObj);
  

  const handleChange=(e)=>{
     
    setPost({...post,[e.target.name]:e.target.value})

  }
  useEffect(async() => {
    
    await fetch(`/getuser/${id}`)
    .then(res=>res.json())
    .then(data=>setPost(data));
  }, []);

  const updatePost=async(e)=>{
     e.preventDefault();
    
    await fetch(`/updateuser/:${post._id}`,{
      method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => {
      if(data.role=='student'){
        navigate('/admin/viewstudents');    
      }
      else{
        navigate('/admin/viewfaculty');
      }
    });
    
    
    
    }

    return (
        <>
            <div className="admin text-white">
            <h1>Update User</h1>
                <div className="box1">
                    
                    <form>

    <div className="form-group">
    <label for="exampleInputEmail1">First Name</label>
    <input value={post.first} onChange={(e)=>handleChange(e)} name='first' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="First Name"/>
    
  </div>

  <div className="form-group">
    <label for="exampleInputEmail1">Last Name</label>
    <input value={post.last} onChange={(e)=>handleChange(e)} name='last' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Last Name"/>
    
  </div>

  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input value={post.email} onChange={(e)=>handleChange(e)} name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
   
  </div>

  <div className="form-group">
    <label for="exampleInputEmail1">Department</label>
    <input value={post.department} onChange={(e)=>handleChange(e)} name='department' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Department"/>
   
  </div>

{/* 
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input value={post.password} onChange={(e)=>handleChange(e)} name='password' type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div> */}

  

  <button onClick={updatePost} type="submit" className="btn btn-success">Update</button>
</form>
                </div>
            </div>

        </>
    )
}

export default Updateuser;
