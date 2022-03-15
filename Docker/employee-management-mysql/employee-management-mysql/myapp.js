const express = require('express');
const mysql = require('mysql');
const app = express();


app.use(express.json());
app.get('/',(req,res)=>{
  res.send('Welcome hello');
});

app.get('/employees',(req,res)=>{
 
    const connection = getConnection();
    const queryString="SELECT * FROM employees";

    connection.query(queryString, (err, rows, fields) => {
        res.json(rows);
      
    });

    connection.end();

});

app.get('/employees/:id',(req,res)=>{
 
    const connection = getConnection();

    const userId=req.params.id;
    const queryString="SELECT * FROM employees WHERE id = ?";

    connection.query(queryString,[userId],(err,rows,fields)=>{
        if(err)
        {   
            console.log("Failed to exicute query: "+err);
            res.sendStatus(500);
            return;
        }
        res.json(rows);
      
    });

    connection.end();

});

app.delete('/employees/remove/',(req,res)=>{
 
    const connection = getConnection();

    const userId=req.body.id;
    const queryString="DELETE FROM employees WHERE id = ?";

    connection.query(queryString,[userId],(err,rows,fields)=>{
        if(err)
        {   
            console.log("Failed to delete record: "+err);
            res.sendStatus(500);
            return;
        }
        res.send("record deleted sucessfully");
        
      
    });
    connection.end();

});
 
app.post('/employees/add/',(req,res)=>{
 
    const connection = getConnection();

    const emp=req.body;
    const queryString="INSERT INTO employees(id,name,email,designation) values (?,?,?,?)";

    connection.query(queryString,[emp.id,emp.name,emp.email,emp.designation],(err,rows,fields)=>{
        if(err)
        {   
            console.log("Failed to add record: "+err);
            res.sendStatus(500);
            return;
        }
        res.send("Record Added sucessfully");
        
      
    });
    connection.end();

});

app.put('/employees/edit/:id',(req,res)=>{
 
    const connection = getConnection();
    
    const userid=req.params.id;
    const emp=req.body;
    const queryString="UPDATE employees SET name=?,email=?,designation=? where id = ?";

    connection.query(queryString,[emp.name,emp.email,emp.designation,userid],(err,rows,fields)=>{
        if(err)
        {   
            console.log("Failed to Update record: "+err);
            res.sendStatus(500);
            return;
        }
        res.send("Record Updated sucessfully");
        
      
    });
    connection.end();

});





function getConnection(){
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        password: 'warlock',
        database:'mydatabase'
       });
}


app.listen(3000,()=>{
      console.log('connection Sucessful');
}); 