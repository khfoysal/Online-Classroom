import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Viewfaculty = () => {
    const [users, setUsers] = useState([]);
    const [notun, setNotun] = useState([]);
    useEffect(async () => {
        await fetch('/getuser')
            .then(response => response.json())
            .then(data => {
                const newData=data.filter((data)=>{
                    return data.role=='faculty';
                })
                setUsers(newData);
                setNotun(newData);
            })
           
    }, []);
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
            if(data.first.toLowerCase().includes(e.target.value.toLowerCase())||data.last.toLowerCase().includes(e.target.value.toLowerCase())){
                return true;
            }
            else if(data.createdBy.toLowerCase().includes(e.target.value.toLowerCase()) || data.institute.toLowerCase().includes(e.target.value.toLowerCase())){
                return true;
            }
            else{
                return false;
            }
        })
        setSearch(e.target.value);
        setUsers(filteredArray);
    }

    return (
        <div style={{ margin: "0px" }}>
            <div className='d-flex justify-content-around'>
            <h1 >View Faculty:{users.length}</h1>
            
            <div className='search'>
            <input onChange={searchKeyword} value={search} className="form-control w-100 my-2" type="search" placeholder="Search" />
            </div>

            
                    
            
                        {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                    
            
            </div>
            
            <div className="row container-fluid">


                {/* {
                users.map((data)=>{
                    return (
                    <div className="card  col-lg-1">
                <h3 className="mt-4">{data.first +' '+data.last}</h3>
                <p>Email {data.email}</p>
                <p>role: {data.role}</p>
                <button className="btn btn-primary">View Details</button>
                <br />
                <button onClick={()=>{deleteUser(data._id)}} className="btn btn-danger">Remove</button>
            </div>)
                })
            } */}

                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Created By</th>
                            <th scope="col">Department</th>
                            <th scope="col">Institution</th>
                            <th scope="col">Email</th>

                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((data, index, key) => {
                                return (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.first}</td>
                                        <td>{data.last}</td>
                                        <td>{data.createdBy}</td>
                                        <td>{data.department}</td>
                                        <td>{data.institute}</td>
                                        <td>{data.email}</td>

                                        <td><Link to={`/admin/updateuser/${data._id}`}><i className="fas fa-edit mr-3"></i></Link>
                                            <Link to='/admin/viewusers'><i onClick={() => { deleteUser(data._id) }} className="far fa-trash-alt"></i></Link></td>
                                    </tr>
                                )
                            })

                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Viewfaculty
