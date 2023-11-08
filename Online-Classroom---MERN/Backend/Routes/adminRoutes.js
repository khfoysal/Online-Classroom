const route=require('express').Router();

route.get('/getuser',async(req,res)=>{
    try {
        let user=await User.find({});
        
        await res.json(user);
        
    // res.send(user);
    } catch (error) {
        console.log(error);
    }
    
})
module.exports= route;