const mongoose=require('mongoose');
const model=new mongoose.Schema({
    username: String,
    password:String,
    totalStudent:String,
    totalFaculty:String,
    institute:String,
    studentCount:String,
    facultyCount:String,
    role:String
});

const Admin=new mongoose.model("admin",model);
module.exports = Admin;