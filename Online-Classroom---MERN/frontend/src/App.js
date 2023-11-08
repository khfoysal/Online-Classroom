import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import {
   Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import './App.css';
import CourseHomeFaculty from './Components/Classroom/CourseHomeFaculty';

import FacultyHome from './Components/AfterLogin/FacultyHome'

import NavBar from './Components/NavBar';
import Home from './Components/Home'

import Admin from './Components/Admin';
import Adminlogin from './Components/Adminlogin';
import Signin from './Components/Signin';

import Addfaculty from './Components/Admin/Addfaculty';

import Updateuser from './Components/Admin/Updateuser';

import Contact from './Components/Contact';
import Todo from './Components/AfterLogin/Todo';
import { useState,useEffect, createContext } from 'react';

import Profile from './Components/AfterLogin/Profile';
import Viewadmin from './Components/SuperAdmin/Viewadmin';

import Viewfaculty from './Components/SuperAdmin/Viewfaculty';
export const UserContext=createContext();
export const AdminContext=createContext();
function App() {
  const[user,setLoginUser]=useState({});
  const [locationn, setLocation] = useState("");
  const location = useLocation();
  useEffect(() => {
    setLocation(location.pathname);
  }, [])
  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("MyUser")));
  }, []);
  
  
  const updateUser=(user)=>{
    localStorage.setItem("MyUser",JSON.stringify(user));
    setLoginUser(user);
  }
  
  return (
    
    <UserContext.Provider value={user}>

    {!location.pathname.includes('admin')&&<NavBar/>}
    
        
    {/* <Youtube/> */}
    <Routes>
      { <Route path="/" element={!user? <Home/>:user.role=='faculty'?<FacultyHome/>:null} /> }
      
      {/* <Route path="/" element={user? (user.role=='student'?<StudentHome/>:<FacultyHome/>)} /> */}
      
      <Route path="/admin" element={<Adminlogin/>} />
      
      <Route path="/signin" element={<Signin updateUser={updateUser}/>} />
      
      <Route path="/admin/addfaculty" element={<Addfaculty/>} />
      <Route path="/adminpanel" element={<Admin/>} />
      
      
      <Route path="/admin/updateuser/:id" element={<Updateuser/>} />
      <Route path="/todo" element={<Todo/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/profile" element={<Profile/>} />

      {/* <Route path="/coursehome/:id" element={<CourseHome/>} /> */}
      <Route path="/coursehomef/:id" element={<CourseHomeFaculty/>} />
      
      <Route path="/viewadmins" element={<Viewadmin/>} />
      <Route path="/admin/viewfaculty" element={<Viewfaculty/>} />

    </Routes>
    {/* <Test/> */}
    </UserContext.Provider>
  );
}

export default App;
