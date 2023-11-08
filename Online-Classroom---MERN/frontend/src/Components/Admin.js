import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './CSS/Admin.css'
const Admin = () => {
    const [admin, setAdmin] = useState({
        username:"",
        password:"",
        institute:"",
        totalStudent:"",
        totalFaculty:""
    })
    const navigate=useNavigate();
    
    const logout=()=>{
        localStorage.removeItem("Admin")
        navigate('/admin');
    }
    const createAdmin=async()=>{
        const {username,password,institute,totalFaculty,totalStudent}=admin;
        if(username && password && institute && totalFaculty && totalStudent){
            const res=await fetch('/createAdmin',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(admin)
            })

            if(res.status==200){
                
                setAdmin({
                    username:"",
                    password:"",
                    institute:"",
                    totalStudent:"",
                    totalFaculty:""
                })
                alert("Admin created successfully.");
            }
            else if(res.status==500){
                alert("username already taken");
            }
        }
    }
    const handleInput=(e)=>{
        setAdmin({...admin,[e.target.name]:e.target.value});
    }
    const adminImage='https://media.istockphoto.com/photos/admin-login-sign-made-of-wood-on-a-wooden-table-picture-id1314651804?b=1&k=20&m=1314651804&s=170667a&w=0&h=oACzv7nQ-POrYNcb6yd3PQTu8BWFVOWQeeOO8EaCcFc=';
    return (
        <>
        <div className=''>
            
        {JSON.parse(localStorage.getItem("Admin")) && JSON.parse(localStorage.getItem("Admin")).role!='superadmin'?
       <div className='bg' >
           <button className='btn btn-danger my-3 mx-3' style={{"float":"right"}} onClick={logout}>Logout</button>
           {<h5 className=' my-4 mx-2' style={{"float":"right","color":"white","display":"inline"}}>{JSON.parse(localStorage.getItem("Admin")).username}</h5>}           
           <div className='admin'>
           
           <div className="optionsCss">
       <div className="adminOption op2">
        <Link to='/admin/addStudent' ><button style={{"fontSize":"2rem"}} className="student btn">Add Student</button> </Link>
        </div>
        <Link className="adminOption op1" to='/admin/addFaculty' >
        <div >
        <button style={{"fontSize":"2rem"}} className="faculty btn"> Add Faculty</button>
        </div>
        </Link>

        <Link  className="adminOption op3" to='/admin/viewusers' >
        <div>
        <button style={{"fontSize":"2rem"}} className="btn">View Users</button>
        </div>
        </Link>

        <Link className="adminOption op4" to='/admin/viewfeedback' >
        <div >
        <button style={{"fontSize":"1.6rem"}} className="btn">View Feedbacks<sup>(3)</sup></button>
        </div>
        </Link>
       </div>
           </div>
       
        
                      
        </div>


    :null}<div>
        {/*super admin er khela shuru  */}
        {JSON.parse(localStorage.getItem("Admin")) && JSON.parse(localStorage.getItem("Admin")).role=='superadmin'?
        <div className="container">
            <img style={{"width":"100%","height":"5%"}} src={adminImage} alt="" />
        <h2>Dashboard</h2>
        <button onClick={logout}>Logout</button>

        <div className="adminOptions my-3">
            <div style={{"cursor":"pointer"}} className='adminOption op1' data-toggle="modal" data-target="#exampleModal">
                <h4 style={{"color":"black"}}>Add Admin</h4>
                
            </div>
            <Link style={{"textDecoration":"none"}} className='adminOption op2' to='/viewadmins'>
            <div >
                <h4 style={{"color":"black"}}>View Admins</h4>
                
            </div>
            </Link>
            <Link style={{"textDecoration":"none"}} className='adminOption op3' to='/admin/viewstudents'>
            <div >
                <h4 style={{"color":"black"}}>View Students</h4>
                
            </div>
            </Link>
            <Link style={{"textDecoration":"none"}} className='adminOption op4' to='/admin/viewfaculty'>
            <div >
            <h4 style={{"color":"black"}}>View Faculty</h4>
            </div>
            </Link>
        </div>


        </div>
      :<div></div>}
        
    </div>
{/* super sesh */}



<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add Admin</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
                 <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Username</label>
                    <input value={admin.username} name='username' onChange={handleInput} type="text" className="form-control" id="exampleFormControlInput1" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Password</label>
                    <input value={admin.password} name='password' onChange={handleInput} type="password" className="form-control" id="exampleFormControlInput1" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Institute</label>
                    <input value={admin.institute} name='institute' onChange={handleInput} type="text" className="form-control" id="exampleFormControlInput1" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Student Limit</label>
                    <input value={admin.totalStudent} name='totalStudent' onChange={handleInput} type="number" className="form-control" id="exampleFormControlInput1" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Faculty Limit</label>
                    <input value={admin.totalFaculty} name='totalFaculty' onChange={handleInput} type="number" className="form-control" id="exampleFormControlInput1" />
                </div>
                

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={createAdmin} type="button" className="btn btn-success">Create</button>
      </div>
    </div>

    
  </div>
</div>
        </div>
       

        </>
    )
}


export default Admin
