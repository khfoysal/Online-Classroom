const mongoose=require('mongoose');
const model=new mongoose.Schema({
    studentId:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    courseId: {
        type:mongoose.Types.ObjectId,
        ref:"classroom"
    },
    courseTitle:String,
    courseCode:String,
    classCode:String,
    courseSection:String,
});

const Invitation=new mongoose.model("classinvitaion",model);
module.exports = Invitation;