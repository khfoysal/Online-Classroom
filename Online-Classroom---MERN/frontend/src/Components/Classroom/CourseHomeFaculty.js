import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom'
import socketIo from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "./CourseHome.css";
const END_POINT="https://online-classroom1.herokuapp.com/";
let socket;
const CourseHomeFaculty = () => {
  let { id } = useParams();
  const [state, setstate] = useState(1);
  const [updatepost, setupdatePost] = useState('');
  const [delPostId,setdelPostId ] = useState("");
  const [inviteMail, setinviteMail] = useState("");
  const [postDescription, setpostDescription] = useState("")
  const postObj = {
    userId: JSON.parse(localStorage.getItem("MyUser"))._id,
    userName: JSON.parse(localStorage.getItem("MyUser")).first + " " + JSON.parse(localStorage.getItem("MyUser")).last,
    classroomId: id,
    description: postDescription,
    createDate: new Date()
  }
  const [course, setCourse] = useState({});
  const [posts, setPosts] = useState([])
  const [people, setPeople] = useState([])
  const [students, setStudents] = useState([]);
  useEffect(() => {
    socket=socketIo(END_POINT,{transports:["websocket"]})  
    socket.on("posted",async(data)=>{
      await fetch(`/getclasspost/${id}`)
      .then(res => res.json())
      .then(data => { setPosts(data); });
    })

    socket.on("postDelete",async()=>{
      await fetch(`/getclasspost/${id}`)
      .then(res => res.json())
      .then(data => { setPosts(data); });
    })
  }, [])
  useEffect(async () => {
    await fetch(`/getCourseDetail/${id}`)
      .then(res => res.json())
      .then(data => { setCourse(data)
      setPeople(data.studentIds);
      });
  }, []);


  useEffect(async () => {
    await fetch(`/getclasspost/${id}`)
      .then(res => res.json())
      .then(data => { setPosts(data); });
  }, [])
  const savePost = async () => {
    await fetch(`/classPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj)
    })
      .then(response => response.json())
      .then(data => setPosts(data));
    setpostDescription("");
    socket.emit("joined",postObj);
  }
  const refreshPosts = async () => {
    console.log("doing");

  }
  const updatePost=async()=>{
    await fetch(`/updatePost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatepost)
    })
      .then(response => response.json())
      .then(data => setPosts(data));
    setupdatePost({description:""});
  }
  const deletePost = async (postId) => {
    await fetch(`/deleteClassPost/${postId}`)
    await fetch(`/getclasspost/${id}`)
      .then(res => res.json())
      .then(data => { setPosts(data) });

      socket.emit("deletePost",postObj);

  }
  const loadStudent=async()=>{
    await fetch("/loadstudent")
    .then(res=>res.json())
    .then(data=>{
      const newData=data.filter((data)=>{
        return data.institute==JSON.parse(localStorage.getItem("MyUser")).institute;
      })
      setStudents(newData);
    });
  }
  const invitePeople=async()=>{
    const obj={
      courseid:course._id,
      email:inviteMail,
    }
    socket.emit("joined","rifat");
    const res=await fetch(`/invitepeople`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
    if(res.status==404){
      // toast.error('Student not found', {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      //   });
    }
    else if(res.status==500){
      toast.error('Student already invited', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
    }
    else if(res.status==200){
      toast.success('Invitation sent!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    // .then(response => response.json())
    // .then(data =>setinviteMail(""));
      
  }
  const arr = ["https://i.ibb.co/HBbCyvM/blob-scene-haikei.png"];
  return (
    <div>
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
      <div className='courseHome container'
        style={{ "backgroundImage": `url(${arr[0]})` }}
      >
        {/* <MiniNav/> */}
        {/* <h1>This is CourseHome {id}</h1>
            <p>dsd</p> */}
        <div>
          <h2>{course.courseCode}: {course.courseTitle}</h2>
          <p> <b>Section: {course.courseSection}</b></p>

        </div>

      </div> <br />
      {/* <MiniNav/> */}
      <div>
        <div className="container-fluid ">
          <div className="d-flex justify-content-center">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <div onClick={()=>setstate(1)} className="nav-link active" >Home</div>
              </li>
              <li className="nav-item">
                <div onClick={()=>setstate(1)} className="nav-link active" data-toggle="modal" data-target="#exampleModal" >Invite</div>
              </li>
              <li className="nav-item active">
                <div onClick={()=>setstate(2)} className="nav-link active " >People</div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/*  */}

      {/* Post delete warning modal starts here */}



<div className="modal fade" id="exampleModaldel" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
  
    <div className="modal-content" style={{"textAlign":"center"}} >
    
      {/* <div className="modal-header" > */}
        <div className="d-flex justify-content-center">
        <img src="https://img.icons8.com/ios/100/FF0000/cancel.png"/>
        
        </div>

      {/* </div> */}
      <div className="modal-body">
      <h3 >Are you sure?</h3>   
      <br />
      <p style={{"color":'gray'}}>Do you really want to delete these records? This process cannot be undone.</p>
      </div>
      
      <div className="modal-footer d-flex justify-content-center">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button onClick={() => { deletePost(delPostId) }} type="button" data-dismiss="modal" className="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</div>

      {/* Post delete warning modal ends here */}

{/* Invite Modal starts here */}



<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Invite People</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <div className="mb-3">
        <form>
                <label className="form-label">Enter Email:</label>
                <input onChange={(e)=>setinviteMail(e.target.value)}  placeholder='abc@example.com' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete='off'/>
                </form>
</div>
      </div>
      <div className="modal-footer">
      <button onClick={loadStudent} type="button" className="btn btn-info" >Student List</button>
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={invitePeople} type="button" className="btn btn-success" data-dismiss="modal">Invite</button>
      </div>
      {students.length>0 ?<h2>Students: {students.length}</h2>:null}
      {students.map((data,index)=>{
        return(
        <div key={index} className="studentList mx-4">
      <div>
      <h4>{data.first+" "+data.last}</h4>
      <h6>{data.email}</h6>
      </div>
      <div>
      <button onClick={()=>{setinviteMail(data.email);invitePeople() }} className='my-3 btn btn-success'>Invite</button>
      </div>
      
      </div>
        )
      })}
      
      
    </div>
  </div>
</div>
{/* Invite modal ends here */}

      {/* Post page starts */}
 { state==1 && <div>
      <div className='container d-flex'>
        {/* <input placeholder='Share Something...' className='announcementInput my-4' type="text" /> */}
        <textarea value={postDescription} onChange={(e) => setpostDescription(e.target.value)} className='announcementInput mx-2 my-4 p-3' placeholder='Share Something' rows="4" cols="50" />
        <div>
          <button onClick={savePost} className='btn btn-secondary my-4 p-3'>Post</button>
        </div>
      </div>
      <div className="reverse">
        {
          posts.map((data, index) => {
            return (



              <div key={index} className="container posts my-3 ">
                <div className='my-2 nameOption'>
                <span><img src="https://img.icons8.com/material-sharp/20/0C95F3/user.png"/>
                  {data.userName}
                  </span>

                  <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <small><i className="fas fa-ellipsis-v"></i></small>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      {data.userId == JSON.parse(localStorage.getItem("MyUser"))._id &&
                        <div><button onClick={()=>setupdatePost(data)} data-toggle="modal" data-target='#exampleModaledit' className="dropdown-item"><i className="fas fa-edit mr-2" ></i>Edit</button>
                          <button onClick={()=>setdelPostId(data._id)} data-toggle="modal" data-target="#exampleModaldel"  className="dropdown-item btn btn-danger"><i className="far fa-trash-alt mr-2"></i>Delete</button></div>
                      }
                    </div>
                  </div>

                  {/* <small><i className="fas fa-ellipsis-v dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i></small> */}
                </div>
                <small>{new Date(data.createDate).toDateString() }</small>
                <p>{data.description}</p>
              </div>

            )
          })


        }
      </div>
      </div>
}

      {/* Post ends here */}

{/* Edit modal starts here */}

<div className="modal fade" id="exampleModaledit" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Post</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
          <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Post</label>
          <textarea name='description' onChange={(e)=>setupdatePost({...updatepost,[e.target.name]:e.target.value})} value={updatepost.description} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={updatePost} type="button" data-dismiss="modal" className="btn btn-success">Update</button>
      </div>
    </div>
  </div>
</div>
{/* Edit modal ends here */}



      {/* Peoples starts here */}
     {state==2 && <div>
      <div className="container">
        <h2>Instructor<p style={{"textAlign":"center"}}>{course.instructorName}</p></h2>
        
        <h2>Peoples</h2>
        {
          people.map((data,index)=>{
            return (
              <>
              <div className="peoples">
              <h3>
              <img src="https://img.icons8.com/material-rounded/40/000000/user-male-circle.png"/>
              {data.first+" "+data.last}
               {data._id==JSON.parse(localStorage.getItem("MyUser"))._id &&<span style={{"fontSize":"15px"}}> (You)</span>}
               </h3>
              <p style={{"marginLeft":"50px"}}>{data.email}</p>
              </div>

              </>
            )
          })
        }
      </div>
      </div>
}
      {/* People ends here */}
    </div>
  )
}

export default CourseHomeFaculty
