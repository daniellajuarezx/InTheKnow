import express from 'express';
import mysql from 'mysql2';

const router=express.Router();
const connection=mysql.createPool({
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
        const data=await connection.promise().query(
            `SELECT * from TRIVIA;`
        );
        console.log(`data[0]=${JSON.stringify(data[0])}`)
        res.status(202).json({
            trivia:data[0]
        });
    } catch(err){
        res.status(500).json({
            message:err
        });
    }
});
/************************************************************************************************
add new question
************************************************************************************************/
router.post("/", async (req, res)=>{
    try{
        const {question, answer, cat_name}=req.body;
        console.log(req.body);

        const data= await connection.promise().query(
            `insert into trivia values (?, ?, ?);`, [question, answer, cat_name]
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