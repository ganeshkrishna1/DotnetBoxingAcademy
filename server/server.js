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
    database:"BoxingAcademy",
})

con.connect(function(err) {
    if(err) { 
        console.log("Error in Connection");
    } else {
        console.log("SQL server Connected");
    }
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login Where email=? AND password=?';
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
    const sql = "INSERT INTO login(`email`,`password`,`username`,`mobileNumber`,`userRole`) VALUES (?)";
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
app.listen(8081, ()=> {
    console.log("Running");
})