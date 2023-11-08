import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Viewadmin = () => {
    const [users, setUsers] = useState([]);
    const [notun, setNotun] = useState([]);
    const [admin, setAdmin] = useState({});
    useEffect(async () => {
        await fetch('/getadmins')
            .then(response => response.json())
            .then(data => {
                const newData=data.filter((ad)=>{
                    return ad.username!='super';
                })
                setUsers(newData);
                setNotun(newData);
                
            })
           
    }, []);
    const editadmin=async(addId)=>{
        await fetch(`/editAdmin/${addId}`)
        .then(res=>res.json())
        .then(data=>setAdmin(data))
    }
    const deleteUser = async (id) => {
        await fetch(`/deleteuser/${id}`)
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                
            })
    }
    const [search, setSearch] = useState('');
    const searchKeyword=(e)=>{
        // console.log(e.target.value);
        const filteredArray=notun.filter(data=>{
            if(data.username.toLowerCase().includes(e.target.value.toLowerCase())||data.institute.toLowerCase().includes(e.target.value.toLowerCase())){
                return true;
            }
            else{
                return false;
            }
        })
        setSearch(e.target.value);
        setUsers(filteredArray);
    }
    const handleInput=(e)=>{
        setAdmin({...admin,[e.target.name]:e.target.value});
    }
    const updateAdmin=async()=>{
        
        const {username,institute,totalFaculty,totalStudent}=admin;
        if(username && institute && totalFaculty && totalStudent){
            const res=await fetch(`/updateAdmin/${admin._id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(admin)
            })
            .then(res=>res.json())
            .then(data => {
                const newData=data.filter((ad)=>{
                    return ad.username!='super';
                })
                
                setUsers(newData);
                setNotun(newData);
                
            })
        
            

            
    }
}

    return (
        <div style={{ margin: "0px" }}>
            <div className='d-flex justify-content-around'>
            <h1 >View Admin:{users.length}</h1>
            
            <div className='search'>
            <input onChange={searchKeyword} value={search} className="form-control w-100 my-2" type="search" placeholder="Search" />
            </div>

            
                    
            
                        {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                    
            
            </div>
            
            <div className="row container-fluid">


                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Institute</th>
                            <th scope="col">Student Created</th>
                            <th scope="col">Faculty Created</th>
                            <th scope="col">St. Limit</th>
                            <th scope="col">Fc. Limit</th>

                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((data, index, key) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.username}</td>
                                        <td>{data.institute}</td>
                                        <td>{data.studentCount}</td>
                                        <td>{data.facultyCount}</td>
                                        <td>{parseInt(data.totalStudent)-parseInt(data.studentCount)}</td>
                                        <td>{parseInt(data.totalFaculty)-parseInt(data.facultyCount)}</td>

                                        <td><i data-toggle="modal" data-target="#exampleModal" onClick={()=>{editadmin(data._id)}}  className="fas fa-edit mr-3"></i>
                                            <Link to='/admin/viewusers'><i onClick={() => { deleteUser(data._id) }} className="far fa-trash-alt"></i></Link></td>
                                    </tr>
                                )
                            })

                        }

                    </tbody>
                </table>
            </div>


            {/* modal */}


<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Admin</h5>
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
        <button onClick={updateAdmin} type="button" data-dismiss="modal" className="btn btn-primary">Update</button>
      </div>
    </div>
  </div>
</div>
            {/* modal end */}
        </div>
    )
}

export default Viewadmin
