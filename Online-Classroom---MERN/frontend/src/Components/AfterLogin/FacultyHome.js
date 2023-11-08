import React from 'react'
import "./Test.css"
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../App';
import Courses from '../Classroom/Courses';
import socketIo from "socket.io-client"
import { Routes, Route, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



const FacultyHome = () => {
  const [courseObj, setCourseObj] = useState({
    instructorId: JSON.parse(localStorage.getItem("MyUser"))._id,
    instructorName: JSON.parse(localStorage.getItem("MyUser")).first + " " + JSON.parse(localStorage.getItem("MyUser")).last,
    courseTitle: '',
    courseCode: '',
    courseSection: '',
    classCode: '',
    studentIds: []
  });
  const [courses, setCourses] = useState([]);
  
  useEffect(async () => {
    await fetch(`/getCourses/${JSON.parse(localStorage.getItem("MyUser"))._id}`)
      .then(response => response.json())
      .then(data => {
        setCourses(data);

      })
  }, [])

  const refresh = (async () => {

    await fetch(`/getCourses/${JSON.parse(localStorage.getItem("MyUser"))._id}`)
      .then(response => response.json())
      .then(data => {
        setCourses(data);
      })
  });

  const createClassroom = async () => {

    const { courseTitle, courseCode, courseSection, classCode } = courseObj;
    if (courseTitle && courseCode && courseSection && classCode) {
      const res = await fetch('/createCourse', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(courseObj)

      })
      if (res.status == 200) {
        refresh();
      }
      else {
        toast.error('Course code must be unique!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });
      }

    }
  }
  const handlechange = (e) => {
    setCourseObj({ ...courseObj, [e.target.name]: e.target.value });
  }

  const user = useContext(UserContext);
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
      <div className="cover container-fluid">
        <h1><span style={{ "fontSize": "45px" }}>Welcome</span><br /> <span style={{ "fontSize": "60px" }}>{user.first + ' ' + user.last}</span></h1>
      </div>
      <br />
      <div className="container-fluid">
        {/* <div className="d-flex justify-content-center">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Invite</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/courses">People</Link>
            </li>
          </ul>
        </div> */}
        <div>
          <button data-target="#exampleModal" data-toggle="modal" className="btn btn-primary ">
            Create class+
          </button>
        </div>
        <div className="">
          <div className="col-lg-1 p-3">



          </div>
          {/* <Courses/> */}
          {<div className="col-lg-12  p-3">
            <h3 style={{ "fontWeight": "bold" }}>Courses</h3>
            <div className="classBox my-3 d-flex row">
              {
                courses.map(data => {
                  return (

                    <Link className='classCard mx-3 my-2 col-sm-3 col-md-6' to={`/coursehomef/${data._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h2 className="my-2">{data.courseCode}</h2>
                      <h4>{data.courseTitle}</h4>
                      <h3>Section: {data.courseSection}</h3>
                      <p>Faculty: {JSON.parse(localStorage.getItem("MyUser")).first + ' ' + JSON.parse(localStorage.getItem("MyUser")).last}</p>
                      <small>Classroom code:<b> {data.classCode} </b></small>

                      {/* 3 dot code for unenroll starts here */}
                      <p className="unenroll" style={{ "float": "right", "marginTop": "2.8vmax" }}>
                        <p className='my-2 nameOption'>{data.userName}

                          <div className="dropdown">
                            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <small><i className="fas fa-ellipsis-v"></i></small>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              {data.userId == JSON.parse(localStorage.getItem("MyUser"))._id &&
                                <div><button className="dropdown-item"><i class="fa-light fa-pen"></i>Edit</button>
                                  <button className="dropdown-item btn btn-danger">Delete</button></div>
                              }
                            </div>
                          </div>
                        </p>
                      </p>
                      {/* 3 dot code for unenroll ends here */}
                    </Link>

                  )

                })
              }




            </div>
          </div>}

        </div>
      </div>

      {/* .......... */}



      <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Course Details</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {/* ... */}
            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">Course Title</label>
                <input onChange={(e) => handlechange(e)} name='courseTitle' value={courseObj.courseTitle} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete='off' />

                <label className="form-label">Course Code</label>
                <input onChange={(e) => handlechange(e)} name='courseCode' value={courseObj.courseCode} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete='off' />

                <label className="form-label">Section</label>
                <input onChange={(e) => handlechange(e)} name='courseSection' value={courseObj.courseSection} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete='off' />
                <label className="form-label">Classroom Code</label>
                <input onChange={(e) => handlechange(e)} name='classCode' value={courseObj.classCode} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete='off' />

              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setCourseObj({ ...courseObj, courseTitle: '', courseCode: '', courseSection: '', classCode: '' })} type="button" className="btn btn-secondary text-left" aria-label="A">
                Clear Form
              </button>
              <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
              <button data-dismiss="modal" onClick={() => createClassroom()} type="button" className="btn btn-success">Create class</button>
            </div>
          </div>
        </div>
      </div>


      <Routes>
        <Route path="/courses" element={<Courses />} />
      </Routes>

    </>
  )
}

export default FacultyHome;
