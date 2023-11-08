import React,{useEffect, useState} from 'react'
import "./CSS/Contact.css"
const dataObj={
    fullName:"",
    email:"",
    message:""
}
const Contact = () => {
    const [post, setPost] = useState(dataObj);
    const [formErrors,setFormErrors]= useState({});
    const [isSubmit,setIsSubmit]= useState(false);

    const handleInput=(e)=>{
       
      setPost({...post,[e.target.name]:e.target.value})

    }
    const sendFeedback=async()=>{
        
        setFormErrors(validate(post));
        setIsSubmit(true);
        if(post.fullName && post.email && post.message){
            const res= await fetch('/sendfeedback',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(post)
            })
            if (JSON.parse(localStorage.getItem("MyUser"))){
                setPost({
                    message:""
                })
            }
            else{
                setPost({
                    fullName:"",
                    email:"",
                    message:""
                })
            }
            
        }
        else{
            // alert("Please fill all the fields.")
        }
        
    }
    useEffect(()=>{
        if (JSON.parse(localStorage.getItem("MyUser"))){
            setPost({
                fullName:JSON.parse(localStorage.getItem("MyUser")).first+" "+JSON.parse(localStorage.getItem("MyUser")).last,
                email:JSON.parse(localStorage.getItem("MyUser")).email
            })
        }
        
        if(Object.keys(formErrors).length===0 && isSubmit){
            console.log(post);
        }
    },[formErrors]);

    const validate =(values)=>{
        const errors = {};
        // const regex = /^[^\s@]+[^\s@]+\.[^\s@]{2,}$/i;
        const regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!values.fullName){
            errors.fullName="Fullname is required!"
        }
        if(!values.email){
            errors.email="Email is required!"
        }else if(!regex.test(values.email)){
            errors.email="This is not a valid email format!";
        }
        if(!values.message){
            errors.message="Write your message!"
        }
        return errors;
    };

    return (
        <div className="container-fluid Abc">
            <div className="container row d-flex justify-content-center">
                <div className="box1 col-md-2">
                {Object.keys(formErrors).length===0 && isSubmit ? (<div className="Successfull">Message sent successfully!!</div>):null}
                    <h2 className='my-3'>Contact Us </h2>
                    
                        <div className="mb-4 ">
                            <label htmlFor="exampleFullName" className="aboutLabel form-label">Full Name</label>
                            <input value={post.fullName} name="fullName" onChange={(e)=>handleInput(e)} className="form-control aboutText" type="text" aria-label="default input example"></input>
                            <p className='contacterrors'>{formErrors.fullName}</p>
                            <label htmlFor="exampleInputEmail1" className="aboutLabel form-label my-2">Email address</label>
                            <input value={post.email} name="email" onChange={(e)=>handleInput(e)} type="email" className="form-control aboutText" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <p className='contacterrors'>{formErrors.email}</p>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            <div>
                                <label htmlFor="exampleMessage" className="aboutLabel form-label my-3">Message</label>
                                <textarea value={post.message} onChange={(e)=>handleInput(e)} name="message" className="my-1 textinput" rows="6" cols="50">
                                </textarea>
                                <p className='contacterrors'>{formErrors.message}</p>
                                <button name="Submit" onClick={sendFeedback} className="btn btn-dark position-relative">
                                    Send Message
                                </button>
                            </div>
                        </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Contact