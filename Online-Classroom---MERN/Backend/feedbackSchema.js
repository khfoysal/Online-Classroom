const mongoose=require('mongoose');
const model=new mongoose.Schema({
    fullName: String,
    email:String,
    message:String,
    createdBy:String
});

const Feedback=new mongoose.model("feedback",model);
module.exports = Feedback;