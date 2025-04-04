import express from 'express';
import mysql from 'mysql2';

const router = express.Router();
const connection = mysql.createPool({
    host:"localhost",
    user:"root",
    password: "password",
    database:"itkdb"
});
/************************************************************************************************
complete table
************************************************************************************************/
router.get("/", async (req, res)=>{
    try{
        const data= await connection.promise().query(
            `SELECT * from user;`
        );
        console.log(`data[0]=${JSON.stringify(data[0])}`)
        res.status(202).json({
            user:data[0]
        });
    } catch(err){
        res.status(500).json({
            message:err
        });
    }
});
/************************************************************************************************
indiv
************************************************************************************************/
router.get("/:uname", async (req, res)=>{
    try{
        const {uname}=req.params;
        console.log(`uname=${uname}`)

        const data= await connection.promise().query(
            `SELECT * from user WHERE UNAME=?;`, [uname]
        );
        console.log(`data[0]=${JSON.stringify(data[0])}`)
        res.status(202).json({
            user:data[0]
        });
    } catch(err){
        res.status(500).json({
            message:err
        });
    }
});
/************************************************************************************************
add new user
************************************************************************************************/
router.post("/", async (req, res)=>{
    try{
        const {uname, pword}=req.body;
        console.log(req.body);

        const data= await connection.promise().query(
            `insert into user values (?, ?);`, [uname, pword]
        );
        console.log(`data[0]=${JSON.stringify(data[0])}`)
        res.status(202).json({
            nessage:data[0]
        });
    } catch(err){
        res.status(500).json({
            message:err
        });
    }
});
export default router;