const mongoose=require('mongoose');
const model=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    classroomId: {
        type:mongoose.Types.ObjectId,
        ref:"classroom"
    },
    text:String,
});

const Chat=new mongoose.model("chat",model);
module.exports = Chat;