const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    userId:String,
    userName:String,
    classroomId:String,
    description:String,
    createDate:Date
});

const classroomPost=mongoose.model('classroomPost',postSchema);

module.exports=classroomPost;