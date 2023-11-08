import React, { useState,useEffect,useContext } from 'react'
import "./Profile.css"
import {UserContext} from "../../App"

const Profile = () => {
    const user = useContext(UserContext);
    const [file, setFile] = useState("");
  const [selectedFile, setselectedFile] = useState("");
  const [preview, setPreview] = useState("");
  
  const handleInput=(e)=>{
    const fileValue=e.target.files[0];
    previewFile(fileValue)
  }
  const previewFile=(image)=>{
    const reader=new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend=()=>{
      setPreview(reader.result)
    }
  }

  const handleFormSubmit=(e)=>{
    e.preventDefault();
    if(!preview)return
    uploadImage(preview);
  }
  const uploadImage=async(base64EncodedImage)=>{
    
    try {
      await fetch("/upload",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({data:base64EncodedImage,_id:user._id})
      })
      .then(res=>res.json())
      .then(data=>{
        const existing=JSON.parse(localStorage.getItem("MyUser"))
        existing['imageURL'] = data;
        localStorage.setItem("MyUser",JSON.stringify(existing));
          setPreview("");
          console.log(JSON.parse(localStorage.getItem("MyUser")));
      })
    } catch (error) {
      console.log(error);
    }
  }








    const [passwords, setPasswords] = useState({
        oldpassword:"",
        newpassword:"",
        email:JSON.parse(localStorage.getItem("MyUser")).email
});
    
 const [state, setstate] = useState(0);
    const handleChange=(e)=>{
        setPasswords({...passwords,[e.target.name]:e.target.value})
        console.log(user);
    }
    const changePass=async()=>{
        if(passwords.newpassword && passwords.oldpassword){
            const res = await fetch('/changepass', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(passwords)
        
              })
              if(res.status==200){
                  setstate(1);
              }
              else if(res.status==404){
                  setstate(2);
              }
        }
        
    }
    const handleFile=(e)=>{
        setFile(e.target.value);
    }
    return (
        <div className='profileParent'>
            <div className="container border profilecontents">
{/* "https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-User-essential-collection-bearicons-glyph-bearicons.png" */}
                <div className='profiledetails'>
                {/* <img className='border-right border-bottom' style={{"width":"50%"}} src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="" /> */}
                <div style={{"display":"flex","justifyContent":"space-between"}}>
                {preview ?
        <img className='profileImage' src={preview} alt=""  />: <img className='profileImage' src={JSON.parse(localStorage.getItem("MyUser")).imageURL}/>
      }
               <label htmlFor="uplo">
               <img style={{"height":"30px","cursor":"pointer"}} src="https://img.icons8.com/windows/50/000000/edit--v4.png"/>
               </label>
                


               

                </div>
                <div className="">
      <form onSubmit={handleFormSubmit}>
        <input style={{"display":"none"}} onChange={handleInput} type="file" name="image" value={file} id="uplo" />
        {preview && <input type="submit" value="Upload" />}
        </form>


    </div>
                {/* <input onChange={(e)=>setFile(e.target.files[0])} type="file" name="" id="" /> */}
                <h2>{JSON.parse(localStorage.getItem("MyUser")).first+" "+JSON.parse(localStorage.getItem("MyUser")).last}</h2>
                <h6>{JSON.parse(localStorage.getItem("MyUser")).email}</h6>
                <p>{JSON.parse(localStorage.getItem("MyUser")).role}</p>
                <p>{JSON.parse(localStorage.getItem("MyUser")).institute}</p>
                </div>

                <div className='changeMail border-left'>
                {state==1?<p style={{"color":"green","fontWeight":"800"}}>Password changed successfully</p>:null}
                {state==2?<p style={{"color":"red","fontWeight":"800"}}>Old Password didn't match</p>:null}
                <h2>Change your password</h2>
                <div className='w-75'>
                <label htmlFor="">Old Password</label>
                <input onChange={handleChange} className='form-control' type="password" name="oldpassword" />
                </div>

                <div className='w-75'>
                <label htmlFor="">New Password</label>
                <input onChange={handleChange} className='form-control' type="password" name="newpassword"  />
                <button onClick={changePass} className='my-3 btn btn-success' type="submit">Change Password</button>
                </div>
                
                
                </div>
                
                
            </div>
            
           
        </div>
    )
}

export default Profile
