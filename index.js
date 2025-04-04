import express from 'express';
import cors from 'cors';
import user from './routes/user.js';
import categories from './routes/categories.js';
import trivia from './routes/trivia.js';

const app=express();
app.use(express.json());
app.use(cors());

app.use('/user', user);
app.use('/categories', categories);
app.use('/trivia', trivia);

app.get('/', (req, res)=>{
    res.send('Server Running!');
})
app.listen(5009,()=>{
    console.log('listening on http://localhost:5009')
})