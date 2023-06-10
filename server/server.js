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
    database:"project",
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
app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    const sql='DELETE FROM academydetails WHERE id = ?';
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete error in sql"});
        return res.json({Status: "Success"})
    })
})
app.put('/update/:id', (req, res) => {
    const serviceCenterID = req.params.id;
    const {
      editName,
      editNumber,
      editAddress,
      editImageUrl,
      editEmail,
      editCentreDescription,
    } = req.body;
  
    let sql = 'UPDATE servicecentermodel SET ';
    let values = [];
  
    if (editName) {
      sql += 'serviceCenterName = ?, ';
      values.push(editName);
    }
  
    if (editNumber) {
      sql += 'serviceCenterPhone = ?, ';
      values.push(editNumber);
    }
  
    if (editAddress) {
      sql += 'serviceCenterAddress = ?, ';
      values.push(editAddress);
    }
  
    if (editImageUrl) {
      sql += 'serviceCenterImageUrl = ?, ';
      values.push(editImageUrl);
    }
  
    if (editEmail) {
      sql += 'serviceCentermailId = ?, ';
      values.push(editEmail);
    }
  
    if (editCentreDescription) {
      sql += 'serviceCenterDescription = ?, ';
      values.push(editCentreDescription);
    }
  
    // Remove the trailing comma and space from the SQL query
    sql = sql.slice(0, -2);
    sql += ' WHERE serviceCenterID = ?';
    values.push(serviceCenterID);
  
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating service center:', err);
        return res.json({ Status: 'Error' });
      }
      return res.json({ Status: 'Success' });
    });
  });

app.listen(8081, ()=> {
    console.log("Running");
})