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
            `SELECT * from categories;`
        );
        console.log(`data[0]=${JSON.stringify(data[0])}`)
        res.status(202).json({
            categories:data[0]
        });
    } catch(err){
        res.status(500).json({
            message:err
        });
    }
});
/************************************************************************************************
trivia/category
************************************************************************************************/
router.get("/:cat_name/trivia", async (req, res) => {
    try {
        const { cat_name } = req.params;
        const data = await connection.promise().query(
            `SELECT trivia.question, trivia.answer
             FROM categories
             INNER JOIN trivia ON trivia.cat_name = categories.cat_name
             WHERE categories.cat_name = ?;`,
            [cat_name]
        );
        console.log(`data[0]=${JSON.stringify(data[0])}`);
        res.status(200).json({
            category: cat_name,
            trivia: data[0],
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}); 
export default router;