const mongoose=require('mongoose');
const classroom=new mongoose.Schema({
    instructorId: String,
    instructorName:String,
    courseTitle:String,
    courseCode:String,
    classCode:String,
    courseSection:String,
    studentIds:[
        {
            type:mongoose.Types.ObjectId,
            ref:"user"
        }
    ]
});

const Classroom=new mongoose.model("classroom",classroom);
module.exports = Classroom;