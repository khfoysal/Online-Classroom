const mongoose=require('mongoose');
const model=new mongoose.Schema({
    first: String,
    last:String,
    email:String,
    department:String,
    password:String,
    role:String,
    createDate:Date,
    token:String,
    institute:String,
    createdBy:String,
    courseIds:[{
        type:mongoose.Types.ObjectId,
        ref:"classroom"
    }],
    invitaionIds:[{
        type:mongoose.Types.ObjectId,
        ref:"classroom"
    }],
    imageURL:String
});

const User=new mongoose.model("user",model);
module.exports = User;