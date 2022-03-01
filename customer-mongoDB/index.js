const express=require('express');
const app=express();
const port=8080;
app.use(express.json());

const customers=[

    {name: 'jhon',age:20},
    {name: 'Anna',age:19},
    {name: 'Peter',age:36},
    {name: 'Smith',age:40},
];


//get api's
app.get('/',(req,res)=>{
    console.log("test");
    res.send(customers);
   
})
app.get('/customers',(req,res)=>{
    res.send(customers);
})

app.get('/customers/show/:name',(req,res)=>{
    const customer =customers.find(v=>v.name===req.params.name);
    if(!customer)
    res.status(404).send("customer not found with that name");
    else
    res.send(customer);
})

//post api

app.post('/customers/add/:name',(req,res)=>{
   console.log(req.body.age);
   const customer={
        age:req.body.age,
        name:req.params.name
   }
   console.log(customer);
   customers.push(customer);
   res.send(customer);
})

//put api
app.put('/customers/update/:name',(req,res)=>{
    const customer =customers.find(v=>v.name===req.params.name);
    if(!customer)
    res.status(404).send("customer not found with that name");
    else
    customer.age=req.body.age
    res.send(customer);
})

//delete api

app.delete('/customers/delete/:name',(req,res)=>{
    const customer =customers.find(v=>v.name===req.params.name);
    if(!customer)
    res.status(404).send("customer not found with that name");
    else
    var index=customers.indexOf(customer);
    
    console.log(index);
    customers.splice(index);
    res.send(customer);
})


app.listen(port,()=>{
    console.log(`listening on port ${port}...`);
});