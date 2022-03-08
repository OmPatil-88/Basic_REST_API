const router = require('express').Router();
const User = require('../User');
const jwt = require('jsonwebtoken');
const verify  = require('../verifyToken');
router.post('/register',async(req,res)=>{


    const emailExist =await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send("User already exist with this mail id")
  
   const user = new User({
       name:req.body.name,
       email:req.body.email,
       password:req.body.password
   }); 
   try{
      const savedUser=await user.save();
      res.send(savedUser);
   }
   catch(err){
       res.send(400).send(err);
   } 
    
});

router.post('/login',async(req,res)=>{
    const usr = await User.findOne({email:req.body.email});
    if(!usr) return res.status(400).send("Wronng email Id")
    
    
    if(usr.password != req.body.password) return res.status(400).send("Wronng Password")
    
   const token =jwt.sign({_id:usr._id},process.env.TOKEN_SECRET);
   res.header('auth-token',token).send(token);

   // res.send("Use Login Succesfull");
});

router.get('/all_data',verify,(req,res)=>{
    res.send("Got All Data Access")
});


module.exports=router;