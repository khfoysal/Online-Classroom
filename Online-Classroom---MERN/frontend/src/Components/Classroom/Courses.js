import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
const Courses = () => {
    const [courses, setCourses] = useState([]);
    useEffect(async() => {
      await fetch(`/getCourses/${JSON.parse(localStorage.getItem("MyUser"))._id}`)
              .then(response => response.json())
              .then(data => {
                  setCourses(data);
                  
              })
    }, [])
    return (
        <div>
         <div className="col-lg-12  p-3">
        <h3 style={{"fontWeight": "bold"}}>Courses</h3>
    <div className="classBox my-3 d-flex row">
    {
      courses.map(data=>{
        return(
        
        <Link className='classCard mx-3 my-2 col-sm-3 col-md-6' to={`/coursehome/${data._id}`} style={{textDecoration:'none',color:'inherit'}}>
          <h2 className="my-2">{data.courseCode}</h2>
          <h4>{data.courseTitle}</h4>
          <h3>Section: {data.courseSection}</h3>
          <p>Faculty: {JSON.parse(localStorage.getItem("MyUser")).first+' '+JSON.parse(localStorage.getItem("MyUser")).last}</p>
          <small>Classroom code:<b> {data.classCode} </b></small>
        </Link>
      
        )
        
      })
    }
       

     

    </div>
    </div>
        </div>
    )
}

export default Courses
