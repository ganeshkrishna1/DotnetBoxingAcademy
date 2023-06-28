import express from "express"
import mysql from "mysql"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"boxing academy",
})

con.connect(function(err) {
    if(err) { 
        console.log("Error in Connection");
    } else {
        console.log("SQL server Connected");
    }
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM register Where email=? AND password=?';
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) { 
            return res.json({Status: "Success"})
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO register(`email`,`password`,`username`,`mobileNumber`,`userRole`) VALUES (?)";
    const values=[
        req.body.email,
        req.body.password,
        req.body.username,
        req.body.mobileNumber,
        req.body.userRole
    ]
    con.query(sql,[values],(err,data)=> {
        if(err) {
            return res.json("Error");
        }
        return res. json(data);
    })
}) 

app.post('/addacademy', (req, res) => {
    const sql = "INSERT INTO academydetails (`academyName`,`contactNumber`,`imageUrl`,`emailId`,`academyLocation`,`academyDescription`) VALUES (?)";
    const values=[
        req.body.academyName,
        req.body.contactNumber,
        req.body.imageUrl,
        req.body.emailId,
        req.body.academyLocation,
        req.body.academyDescription
    ]
    con.query(sql,[values],(err,data)=> {
        if(err) {
            return res.json({Error:"error inside the query"});
        }
        return res.json(data);
    })
})
app.get('/getdetails',(req,res)=>{
    const sql="SELECT * FROM academydetails";
    con.query(sql,(err,result)=>{
        if(err) return res,json({Error:"Got an error in the sql"});
        return res.json({Status:"Success",Result:result})

    })
})
app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM academydetails where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Get academy error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})
app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    const sql='DELETE FROM academydetails WHERE id = ?';
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete error in sql"});
        return res.json({Status: "Success"})
    })
})
app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  let sql = 'UPDATE academydetails SET ? WHERE id = ?';

  con.query(sql, [updatedData, id], (err, result) => {
    if (err) {
      console.error('Error updating academy details', err);
      return res.json({ Status: 'Error' });
    }
    return res.json({ Status: 'Success' });
  });
});
app.get('/getcourses',(req,res)=>{
    const sql="SELECT * FROM course";
    con.query(sql,(err,result)=>{
        if(err) return res,json({Error:"Got an error in the sql"});
        return res.json({Status:"Success",Result:result})

    })
})
app.delete('/deletecourse/:id',(req,res)=>{
    const id = req.params.id;
    const sql='DELETE FROM course WHERE id = ?';
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete error in sql"});
        return res.json({Status: "Success"})
    })
})
app.post('/addcourse', (req, res) => {
    const sql = "INSERT INTO course (`coursename`,`courseduration`,`coursetimings`,`numberofstudents`,`coursedescription`) VALUES (?)";
    const values=[
        req.body.coursename,
        req.body.courseduration,
        req.body.coursetimings,
        req.body.numberofstudents,
        req.body.coursedescription
    ]
    con.query(sql,[values],(err,data)=> {
        if(err) {
            return res.json({Error:"error inside the query"});
        }
        return res.json(data);
    })
})
app.get('/getcourse/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM course where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Get academy error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})
app.put('/updatecourse/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
  
    let sql = 'UPDATE course SET ? WHERE id = ?';
  
    con.query(sql, [updatedData, id], (err, result) => {
      if (err) {
        console.error('Error updating academy details', err);
        return res.json({ Status: 'Error' });
      }
      return res.json({ Status: 'Success' });
    });
  });
  app.post('/enrollform', (req, res) => {
    const sql = "INSERT INTO students (`coursename`,`firstName`,`lastName`,`gender`,`fatherName`,`phoneNumber1`,`phoneNumber2`,`motherName`,`emailId`,`age`,`houseNo`,`streetName`,`areaName`,`pincode`,`state`,`nationality`) VALUES (?)";
    const values=[
        req.body.coursename,
        req.body.firstName,
        req.body.lastName,
        req.body.gender,
        req.body.fatherName,
        req.body.phoneNumber1,
        req.body.phoneNumber2,
        req.body.motherName,
        req.body.emailId,
        req.body.age,
        req.body.houseNo,
        req.body.streetName,
        req.body.areaName,
        req.body.pincode,
        req.body.state,
        req.body.nationality,

    ]
    con.query(sql,[values],(err,data)=> {
        if(err) {
            return res.json({Error:"error inside the query"});
        }
        return res.json(data);
    })
})
app.get('/enrolledcourse', (req, res) => {
    const sql = "SELECT coursename,date from students";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get academy error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})
app.get('/getstudents', (req, res) => {
    const sql = "SELECT * from students";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get academy error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})
app.get('/getstudents/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM students where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Get academy error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})
app.put('/updatestudents/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
  
    let sql = 'UPDATE students SET ? WHERE id = ?';
  
    con.query(sql, [updatedData, id], (err, result) => {
      if (err) {
        console.error('Error updating academy details', err);
        return res.json({ Status: 'Error' });
      }
      return res.json({ Status: 'Success' });
    });
  });
app.delete('/deletestudents/:id',(req,res)=>{
    const id = req.params.id;
    const sql='DELETE FROM students WHERE id = ?';
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete error in sql"});
        return res.json({Status: "Success"})
    })
})

app.listen(8081, ()=> {
    console.log("Running");
})