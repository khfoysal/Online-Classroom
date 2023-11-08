import React, { useContext,useEffect,useState } from 'react'
import './Todo.css'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'



const dataObj={
  userId:'',
  todoTitle:'',
  isDone:false,
  dueDate:new Date(),
}

const Todo = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [todo, setTodo] = useState({
    userId:JSON.parse(localStorage.getItem("MyUser"))._id,
    todoTitle:'',
    isDone:false,
    dueDate:selectedDate
  });
  
  
  const user= useContext(UserContext);
  
  const [todos, setTodos] = useState([]);
  const [state, setstate] = useState(1);
  const handleChange=(e)=>{
    setTodo({...todo,[e.target.name]:e.target.value})
    

  }

useEffect(async() => {

  await fetch(`/getTodo/${JSON.parse(localStorage.getItem("MyUser"))._id}`)
  .then(response => response.json())
  .then(data=> {
      setTodos(data);
  })
}, []);
  const refresh=(async() => {
    
      await fetch(`/getTodo/${JSON.parse(localStorage.getItem("MyUser"))._id}`)
      .then(response => response.json())
      .then(data=> {
          setTodos(data);
      })
    });
  const addTodo=async(e)=>{
    
    const {todoTitle,dueDate}=todo;
    if(todoTitle && dueDate){
      // setTodos(...todos,todo);
      await fetch('/addTodo',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(todo)
    })
    .then(response => response.json())
    .then(data => console.log(data));
    setTodo(todo);
    refresh();
    }
    else{
      alert("Please fill all the fields");
    }
  }
  const deleteTodo=async(id)=>{
    await fetch(`/deletetodo/${id}`)
    .then(response => response.json())
    .then(data=> {
         setTodos(data);
        // setTodo(todo);
        // refresh();
    })
}
const updateDate=(data)=>{
  
  setSelectedDate(data);
  if(data){
    todo.dueDate=data.toLocaleDateString().toString();
  }
   
   
}
  const updateState=(data)=>{
    if(state){
      setstate(0);
    }
    setTodo(data);
    
  }
  const updateTodo=async()=>{
    const {todoTitle,dueDate}=todo;
    if(todoTitle && dueDate){
      await fetch(`/updatetodo`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(todo)
    })
    .then(response => response.json())
    .then(data => console.log(data));
    setTodo(todo);
    setstate(1);
    refresh();
      
    }
    else{
      alert("Please fill all the fields");
    }
  }
  const markAsDone=async(data)=>{
    console.log(data);
    await fetch(`/markAsDone`,{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => console.log(data));
  setTodo(todo);
  refresh();
    
    
  }
  return (
    <div>
     <p className="container" style={{"textAlign":"right","marginRight":"10px"}}><b> {user.email} </b></p>
      <div className=" container container1 my-5">
        <h1 className="todo-header mx-1 my-3">
          <i className="fas fa-check-square me-1 mx-1"></i>
          My Todo-s</h1>
        <br />



{/* Input for todo starts here */}
        <div className="inputTodo">

          <div className="input-group  w-75 mb-1 ">
            {/* <input type="text" className="form-control font-weight-bold" placeholder="Add new..." aria-label="" aria-describedby="basic-addon2" /> */}
            <div className="input-group mb-3">

              <input onChange={(e)=>handleChange(e)} value={todo.todoTitle} name='todoTitle' type="text" className="form-control w-50" placeholder="Add new..." aria-label="Username" />


              <div className="form-control mx-2 w-25 border-0 ">
                <ReactDatePicker placeholderText="Enter due date" selected={selectedDate}
                  onChange={data=>updateDate(data)}
                  dateFormat='dd/MM/yyyy'
                  name='dueDate'
                  minDate={new Date()} isClearable
                  className='datePicker'
                />
                {/* <span><i className="fas fa-calendar-alt"></i></span> */}
              </div>

              

              {state==1 ? <button onClick={addTodo} className="btn btn-success my-3" type="button">Add Todo</button>
              :
              <button onClick={updateTodo} className="btn btn-success my-3" type="button">Update</button>
              }
            </div>

          </div>

        </div>
        <hr />
        

        {/* List starts here... */}
        <h2>Todos</h2>
        
<table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Due Date</th>
                            <th scope="col">Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((data,index)=>{
                                return (
                                    <tr  key={index} className='font-weight-bold' style={{"cursor":"pointer"}}>
                                        <th scope="row">{index + 1}</th>
                                        <td onClick={()=>markAsDone(data)} className={data.isDone ?'checked':undefined}>  {data.todoTitle}</td>
                                        <td onClick={()=>markAsDone(data)} className={data.isDone ?'checked':undefined}>{new Date(data.dueDate).toLocaleDateString()}</td>
                                        <td><i onClick={()=>updateState(data)} className="fas fa-edit mr-3"></i>
                                            <Link to='/todo'><i onClick={() => { deleteTodo(data._id) }} className="far fa-trash-alt"></i></Link></td>
                                    </tr>
                                )
                            })

                        }6

                    </tbody>
                </table>

      </div>
      
    </div>
  )
}

export default Todo
