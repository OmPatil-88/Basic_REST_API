const express = require('express');
const mongoose =require('mongoose');
const dotenv =require('dotenv');
const app = express();
dotenv.config();

//Import Routers
const authRoute=require('./routes/auth');

var database;
//connect to database
mongoose.connect(process.env.DB_CONNECT,
{useNewUrlParser:true},
()=>{  
console.log('Connection Succesfull to DB');
});

//
app.use(express.json());
app.use('/auth/user',authRoute);







// app.get('/',(req,res)=>{
//   res.send('Welcome');
// });

// app.get('/customers',(req,res)=>{
//     database.collection('customers').find({}).toArray((err,result)=>{
//       if(err) throw err       
//       res.send(result);
//     });
 
// });

// app.post('/customers/add/:name',(req,res)=>{
//   console.log(req.body.age);
//   const customer={
//        age:req.body.age,
//        name:req.params.name
//   }
//   console.log(customer);
//   database.collection('customers').insertOne(customer);
//   res.send(customer);
// });

// app.put('/customers/update/:name',(req,res)=>{
//   database.collection('customers').find({name:req.params.name}).toArray((err,result)=>{
//     if(err) throw err;
//     if(result==false){
//       res.status(404).send("customer not found with that name");
//     }
//   });
//   let query={name:req.params.name};
//  customer={
//        age:req.body.age,
//        name:req.body.name
//   }
//   let dataset={
//        $set:customer
//   }
//   console.log(customer);
//  /* database.collection('customers').updateOne(
//     query,
//     dataset,
//     (err,result)=>{
//     if(err) throw err
//     res.send(customer);
//   });*/

//   database.collection('customers').updateOne(
//     {name:req.params.name},
//     { $set:customer},
//     (err,result)=>{
//     if(err) throw err
//     res.send(customer);
//   });
// });

// app.delete('/customers/delete/:name',(req,res)=>{
//  var customer;
//   database.collection('customers').find({name:req.params.name}).toArray((err,result)=>{
//     if(err) throw err;
//     if(result==false){
//       res.status(404).send("customer not found with that name");
//     }
//     customer=result;
//   });

//   database.collection('customers').deleteOne(
//     {name:req.params.name},
//     (err,result)=>{
//     if(err) throw err
//     res.send(customer);
//   });
// });

app.listen(8080,()=>{
    console.log('Server Set up and runnig');
});

