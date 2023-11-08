import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import MiniNav from '../AfterLogin/MiniNav';
import "./CourseHome.css";

const CourseHome = () => {
    let {id}=useParams();
    const [postDescription, setpostDescription] = useState("")
    const postObj={
        userId:JSON.parse(localStorage.getItem("MyUser"))._id,
        userName:JSON.parse(localStorage.getItem("MyUser")).first+" "+JSON.parse(localStorage.getItem("MyUser")).last,
        classroomId:id,
        description:postDescription,
        createDate: new Date()
    }
    const [course, setCourse] = useState({});
    const [posts, setPosts] = useState([])
    useEffect(async() => {
    await fetch(`/getCourseDetail/${id}`)
    .then(res=>res.json())
    .then(data=>{setCourse(data);});
  }, []);
  useEffect(async() => {
    await fetch(`/getclasspost/${id}`)
    .then(res=>res.json())
    .then(data=>{setPosts(data);});
  }, [])
  const savePost=async()=>{
    await fetch(`/classPost`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(postObj)
    })
    .then(response => response.json())
    .then(data =>setPosts(data));
    setpostDescription("");
      
  }
  const refreshPosts=async()=>{
    console.log("doing");
    
  }
  const deletePost=async(postId)=>{
    await fetch(`/deleteClassPost/${postId}`)
    await fetch(`/getclasspost/${id}`)
    .then(res=>res.json())
    .then(data=>{console.log(data)});

  }
  const arr=["https://i.ibb.co/HBbCyvM/blob-scene-haikei.png"];
    return (
        <div>
        <div className='courseHome container'
        style={{"backgroundImage":`url(${arr[0]})`}}
        >
            {/* <MiniNav/> */}
            {/* <h1>This is CourseHome {id}</h1>
            <p>dsd</p> */}
            <div>
            <h2>{course.courseCode}: {course.courseTitle}</h2>
            <p> <b>Section: {course.courseSection}</b></p>
            </div>
            
        </div> <br />
<MiniNav/>
        <div className='container d-flex'>
            {/* <input placeholder='Share Something...' className='announcementInput my-4' type="text" /> */}
            <textarea value={postDescription} onChange={(e)=>setpostDescription(e.target.value)} className='announcementInput mx-2 my-4 p-3' placeholder='Share Something' rows="4" cols="50"/>
            <div>
            <button onClick={savePost} className='btn btn-secondary my-4 p-3'>Post</button>
            </div>
        </div>
        <div className="reverse">
        { 
         posts.map((data,index)=>{
            return(
                

                
            <div key={index} className="container posts my-3 ">
            <p className='my-2 nameOption'>{data.userName}

            <div className="dropdown">
  <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <small><i className="fas fa-ellipsis-v"></i></small>
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
  {data.userId==JSON.parse(localStorage.getItem("MyUser"))._id &&
      <div><button className="dropdown-item"><i class="fa-light fa-pen"></i>Edit</button>
    <button onClick={()=>{deletePost(data._id)}} className="dropdown-item btn btn-danger">Delete</button></div>
         }   
  </div>
</div>

            {/* <small><i className="fas fa-ellipsis-v dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i></small> */}
            </p>
            <small>{new Date(data.createDate).toDateString()}</small>
            <p>{data.description}</p>
            </div>
            
            )
        })

            
        }
</div>
       
        </div>
    )
}

export default CourseHome
