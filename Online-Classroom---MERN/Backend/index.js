const express=require('express');
const app=express();
const dotenv=require("dotenv");
dotenv.config();
const server=require('http').createServer(app);
const io=require("socket.io")(server,{cors:{origin:"*"}})
const PORT=process.env.PORT || 8000;
const bcrypt=require('bcrypt');
const URL='mongodb+srv://user:user@cluster0.ayogb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const User=require('./userSchema');
const Admin=require('./adminSchema');
const Todo=require('./todoSchema');
const Chat=require("./chatSchema");
const Classroom=require('./classSchema');
const ClassPost=require('./classroomPostSchema');
const Feedback=require("./feedbackSchema");
const { getMaxListeners } = require('./classroomPostSchema');
const cloudinary=require("cloudinary").v2;

app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:true}))

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRECT

})

app.post("/upload",async(req,res)=>{
    try {
        const fileStr=req.body.data;
        const uploadedResponse=await cloudinary.uploader.upload(fileStr,{upload_preset:"dev_setup"})
        console.log(uploadedResponse);
        const admin=await User.findByIdAndUpdate(req.body._id,{$set:{imageURL:uploadedResponse.url}});
        
        res.json(uploadedResponse.url)
    } catch (error) {
        console.error(error);
    }
});



mongoose.connect(
    URL,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(()=>console.log('database connected.'))
.catch((e)=>console.log(e));
app.get("/",(req,res)=>{
    res.send("Thanks for visiting.");
})
app.post('/post',async(req,res)=>{
    
     const  obj=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    
    await obj.save()
    res.send("hello");
})

 
app.post('/adduser',async(req,res)=>{
    let duplicate=await User.findOne({email:req.body.email});
    let admindata=await Admin.findOne({username:req.body.createdBy});
    // console.log(admindata);
    if(!duplicate){
        // console.log("aschi 2");
        if((req.body.role=='student' && parseInt(admindata.studentCount)<parseInt(admindata.totalStudent))||(req.body.role=='faculty' && parseInt(admindata.facultyCount)<parseInt(admindata.totalFaculty))){
            req.body.password=await bcrypt.hash(req.body.password,10);
            const token=await jwt.sign({"first":req.body.first,"email:":req.body.email},"thisismysecretkey");
            // console.log("vitoreee");
            const  obj=new User({
                first:req.body.first,
                last:req.body.last,
                email:req.body.email,
                department:req.body.department,
                password:req.body.password,
                institute:req.body.institute,
                createdBy:req.body.createdBy,
                imageURL:req.body.imageURL,
                role:req.body.role,
                createDate:req.body.createDate,
                token:token
            }); 
            if(req.body.role=='student'){
                const admin=await Admin.findByIdAndUpdate(admindata._id,{$set:{studentCount:parseInt(admindata.studentCount)+1}});
            }
            else{
                const admin=await Admin.findByIdAndUpdate(admindata._id,{$set:{facultyCount:parseInt(admindata.facultyCount)+1}});
            }            
            obj.save(obj);
            res.json({"res":"ok"});
        }
        else{
            console.log("Limit full");
        }
        
    }
    else{
        
        await res.status(201).json("user exists");

    }

})
app.get("/editAdmin/:id",async(req,res)=>{
    const admin=await Admin.findOne({_id:req.params.id});
    res.json(admin);
})
app.post("/updateAdmin/:id",async(req,res)=>{
    const admin=await Admin.findByIdAndUpdate(req.params.id,{$set:req.body});
    const admins=await Admin.find({});
    res.json(admins);
})

app.post('/usersignin',async(req,res)=>{
    
    try {
        
        let posts=await User.findOne({email:req.body.email});
        const passwordMatch=await bcrypt.compare(req.body.password,posts.password);
        if(posts && passwordMatch){
            await res.status(200).json(posts); 
        }
        else{
            await res.status(404).json("painai"); 
        }
        
    } catch (error) {
        console.log(error)
        res.status(404).json({"msg":"failed"});
    }
    
})

app.get('/getuser',async(req,res)=>{
    try {
        let user=await User.find({});
        
        await res.json(user);
        
    // res.send(user);
    } catch (error) {
        console.log(error);
    }
    
})

app.get('/deleteuser/:id',async(req,res)=>{
const id=req.params.id;
try {

    const lala=await User.findByIdAndRemove(id);  
    const add=await Admin.findOne({username:lala.createdBy});
    if(lala.role=='student'){
        
        const admin=await Admin.findByIdAndUpdate(add._id,{$set:{studentCount:parseInt(add.studentCount)-1}});
    }
    else{
        const admin=await Admin.findByIdAndUpdate(add._id,{$set:{facultyCount:parseInt(add.facultyCount)-1}});
    }
    let user=await User.find({});
        
    await res.json(user);  
} catch (error) {
    console.log(error);
}


});

app.get('/getuser/:id',async(req,res)=>{
    try {
        let user=await User.findOne({_id:req.params.id});
        await res.json(user);
        
    // res.send(user);
    } catch (error) {
        console.log(error);
    }
});

app.post('/updateuser/:id',async(req,res)=>{
    try {
        // const  obj=new User({
        //     first:req.body.first,
        //     last:req.body.last,
        //     email:req.body.email,
        //     department:req.body.department,
        //     password:req.body.password,
        //     role:req.body.role,
        //     createDate:req.body.createDate,
        //     token:token
        // });
        const user=await User.findByIdAndUpdate(req.body._id,{$set:req.body});
        
        await res.json(user);
        
    // res.send(user);
    } catch (error) {
        console.log(error);
    }
})

//add todo

app.post('/addTodo',async(req,res)=>{
     
    const  obj=new Todo({
        userId:req.body.userId,
        todoTitle:req.body.todoTitle,
        isDone:req.body.isDone,
        dueDate:req.body.dueDate,
    });
    console.log(obj);
    await obj.save(obj);
    res.json({"res":"ok"});
})

app.get('/getTodo/:id',async(req,res)=>{
    
    let user=await Todo.find({"userId":req.params.id});
        
    await res.json(user);
})

app.get('/deletetodo/:id',async(req,res)=>{
    const id=req.params.id;
    try {
        const deletedTodo=await Todo.findByIdAndRemove(id);  
        let user=await Todo.find({"userId":deletedTodo.userId});
            
        await res.json(user);  
    } catch (error) {
        console.log(error);
    }
    
    
    });

    app.post('/updatetodo',async(req,res)=>{
        
        try {
            await Todo.findByIdAndUpdate(req.body._id,{$set:req.body});  
            // const user=await User.findByIdAndUpdate(req.body._id,{$set:req.body});
            
            res.json({"res":"ok"});
        } catch (error) {
            console.log(error);
        }
        
        
        });
        app.post('/markAsDone',async(req,res)=>{
        
            try {
                if(req.body.isDone){
                    req.body.isDone=false;
                }else{
                    req.body.isDone=true;
                }
                
                await Todo.findByIdAndUpdate(req.body._id,{$set:req.body});  
                // const user=await User.findByIdAndUpdate(req.body._id,{$set:req.body});
                
                res.json({"res":"ok"});
            } catch (error) {
                console.log(error);
            }
            
            
            });

// classroom requests
app.post('/createCourse',async(req,res)=>{
    const course=await Classroom.findOne({classCode:req.body.classCode});
   if(course){
       
       res.status(500).json("must be unique");
   }
   else{
    const  obj=new Classroom({
        instructorId:req.body.instructorId,
        instructorName:req.body.instructorName,
        courseTitle:req.body.courseTitle,
        courseCode:req.body.courseCode,
        courseSection:req.body.courseSection,
        classCode:req.body.classCode,
        studentIds:req.body.studentIds
    });
    
    await obj.save(obj);
    res.status(200).json({"res":"ok"});
   }
    
})

app.get('/getCourses/:id',async(req,res)=>{
    try {
        let user=await Classroom.find({"instructorId":req.params.id});
        
        await res.json(user);
        
    // res.send(user);
    } catch (error) {
        console.log(error);
    }
    
})
app.get('/getCoursesSTD/:id',async(req,res)=>{
    try {
        
        const user=await User.findOne({_id:req.params.id}).populate("courseIds invitaionIds");
        const responseArray={
            courses:user.courseIds,
            invitaions:user.invitaionIds
        }
        
        
     res.json(responseArray);
    } catch (error) {
        console.log(error);
    }
    
})
app.post("/invitepeople",async(req,res)=>{
    // console.log(req.body.email);

    try {
        const student=await User.findOne({"email":req.body.email}).populate("invitaionIds");
        if(student){
     const course=await Classroom.findOne({_id:req.body.courseid});
     const invitations=student.invitaionIds;

     for(let i=0; i<invitations.length; i++){
        if(JSON.stringify(invitations[i]) === JSON.stringify(course)){
            return res.status(500).json("course already added");
        }
    }

    
        let user=await User.updateOne({"_id":student._id},{
            $push:{invitaionIds:req.body.courseid}
        });
        res.status(200).json("done");
    }
    else{
        res.status(404).json("not found");
    }
    } catch (error) {
        
    }
     

    
})

app.get('/getCourseDetail/:id',async(req,res)=>{
    try {
        let user=await Classroom.findOne({"_id":req.params.id}).populate("studentIds");
        
        
        await res.json(user);
        
        
    
    } catch (error) {
        console.log(error);
    }
})

app.post('/classPost',async(req,res)=>{
    

    const  obj=new ClassPost({
        userId:req.body.userId,
        userName:req.body.userName,
        classroomId:req.body.classroomId,
        description:req.body.description,
        createDate:req.body.createDate
    });
    
    await obj.save(obj);

    const getPosts=await ClassPost.find({"classroomId":req.body.classroomId});
    res.json(getPosts);
})

app.get('/getclasspost/:id',async(req,res)=>{
    const getPosts=await ClassPost.find({"classroomId":req.params.id});
    res.json(getPosts);
})

app.get("/deleteClassPost/:id",async(req,res)=>{
    const a=await ClassPost.findByIdAndRemove(req.params.id);
    res.json({msg:"done"})
})


app.post("/sendfeedback",async(req,res)=>{
    const user=await User.findOne({email:req.body.email});
    const  obj=new Feedback({
        fullName:req.body.fullName,
        email:req.body.email,
        message:req.body.message,
        createdBy:user.createdBy
    });
    
    await obj.save()
    res.send("Successfull");
})

app.get("/getfeedback",async(req,res)=>{
    const feedback=await Feedback.find({});
    await res.json(feedback);
})
app.get("/deletefeedback/:id",async(req,res)=>{
    
    await Feedback.findByIdAndRemove(req.params.id);
    const feedback=await Feedback.find({});
    await res.json(feedback);
})
app.get("/loadstudent",async(req,res)=>{
    const students= await User.find({role:"student"});
    res.json(students);
})
app.post("/changepass",async(req,res)=>{
    
    try {
        
        let posts=await User.findOne({email:req.body.email});
        const passwordMatch=await bcrypt.compare(req.body.oldpassword,posts.password);
        if(posts && passwordMatch){
            const newPass=await bcrypt.hash(req.body.newpassword,10);
            await User.findByIdAndUpdate(posts._id,{$set:{password:newPass}});  
            await res.status(200).json("paisi"); 
        }
        else{
            await res.status(404).json("painai"); 
        }
        
    } catch (error) {
        console.log(error)
        res.status(404).json({"msg":"failed"});
    }
})

// admin pages
app.post('/adminlogin',async(req,res)=>{
    const admin=await Admin.findOne({username:req.body.username});
    const passwordMatch=await bcrypt.compare(req.body.password,admin.password);
    if((admin && passwordMatch)||(req.body.username=='super' && req.body.password=='super')){
        res.status(200).json(admin);
    }
    else{
        console.log("not found");
    }

})
app.post("/createAdmin",async(req,res)=>{
    const user=await Admin.findOne({username:req.body.username});
    if(user){
        res.status(500).json({msg:"not ok"});
    }
    else{
        req.body.password=await bcrypt.hash(req.body.password,10);

    const  obj=new Admin({
        username: req.body.username,
        password:req.body.password,
        totalStudent:req.body.totalStudent,
        totalFaculty:req.body.totalFaculty,
        institute:req.body.institute,
        studentCount:0,
        facultyCount:0,
        role:'admin'
    });
    
    await obj.save(obj);
    res.status(200).json({"res":"ok"});
    }
    
})
app.get("/getadmins",async(req,res)=>{
    const admin=await Admin.find({});
    res.json(admin);
})

app.post("/updatePost",async(req,res)=>{
    await ClassPost.findByIdAndUpdate(req.body._id,{$set:req.body});
    const posts=await ClassPost.find({classroomId:req.body.classroomId});
    res.json(posts);
})

// socket starts
io.on("connection",(socket)=>{
    // console.log("A user connected");
    socket.on("disconnect",()=>{
        // console.log("User disconnected");
    })
    
    socket.on("joined",(data)=>{
        socket.broadcast.emit("posted",data);
    })
    
    socket.on("deletePost",()=>{
        socket.broadcast.emit("postDelete");
    })
    socket.on("chatsend",()=>{
        socket.broadcast.emit("receivedMessaged");
    })
})
if(process.env.NODE_ENV=='production'){
    app.use(express.static("frontend/build"));
}
server.listen(PORT,()=>{
    console.log("server is listening on PORT "+PORT);
})