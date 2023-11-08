const mongoose=require('mongoose');
const model=new mongoose.Schema({
    userId: String,
    todoTitle:String,
    isDone:Boolean,
    dueDate:Date,
});

const Todo=new mongoose.model("todo",model);
module.exports = Todo;