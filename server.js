const express = require('express');
const jwt = require('jsonwebtoken');
const {candidates} = require('./connection')
const dotenv = require('dotenv');
dotenv.config();

// console.log(process.env.secret)


const app = express();
app.use(express.json())


app.get('/', isAuthenticatedUser, async (req,res)=>{
    const candidate1 = await candidates.findAll()
    res.send("Hello world")
})

app.post('/register', async (req,res)=>{
    const candidate1 = await candidates.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    res.send(candidate1)
})

app.post('/login', async(req,res)=> {
    const candidate1 = await candidates.findOne({
        where: {
            email: req.body.email
        },attributes: ['name', 'email']
    })
    name1 = candidate1.toJSON()
    const toky = jwt.sign(name1 , process.env.secret, {expiresIn: '20m'})
    res.send(toky)
    // res.send('hello world')
})

async function isAuthenticatedUser(req, res, next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.secret);
        req.user = decoded;
        console.log(req.user)
        next();
    }catch(err){
        res.status(401).send('Unauthorized');
    }
}


app.listen(5253, ()=> console.log('listening on 5253'))