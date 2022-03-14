const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
var database;

app.use('/auth/user',authRoute);

app.get('/',(req,res)=>{
  res.send('Welcome');
});

app.get('/customers',(req,res)=>{
    database.collection('customers').find({}).toArray((err,result)=>{
      if(err) throw err       
      res.send(result);
    });
 
});

app.post('/customers/add/:name',(req,res)=>{
  console.log(req.body.age);
  const customer={
       age:req.body.age,
       name:req.params.name
  }
  console.log(customer);
  database.collection('customers').insertOne(customer);
  res.send(customer);
});

app.put('/customers/update/:name',(req,res)=>{
  database.collection('customers').find({name:req.params.name}).toArray((err,result)=>{
    if(err) throw err;
    if(result==false){
      res.status(404).send("customer not found with that name");
    }
  });
  let query={name:req.params.name};
 customer={
       age:req.body.age,
       name:req.body.name
  }
  let dataset={
       $set:customer
  }
  console.log(customer);
 /* database.collection('customers').updateOne(
    query,
    dataset,
    (err,result)=>{
    if(err) throw err
    res.send(customer);
  });*/

  database.collection('customers').updateOne(
    {name:req.params.name},
    { $set:customer},
    (err,result)=>{
    if(err) throw err
    res.send(customer);
  });
});

app.delete('/customers/delete/:name',(req,res)=>{
 var customer;
  database.collection('customers').find({name:req.params.name}).toArray((err,result)=>{
    if(err) throw err;
    if(result==false){
      res.status(404).send("customer not found with that name");
    }
    customer=result;
  });

  database.collection('customers').deleteOne(
    {name:req.params.name},
    (err,result)=>{
    if(err) throw err
    res.send(customer);
  });
});

app.listen(3000,()=>{
 
    mongoose.connect('mongodb://localhost:27017/mydatabase?authSource=admin',{useNewUrlParser:true},(error,result)=>{
      if(error) throw error
      database=result.db('mydatabase');
      console.log('connection Sucessful');
    });
});