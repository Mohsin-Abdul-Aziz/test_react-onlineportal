const express= require('express');
const mongoose=require('mongoose');
const BodyParser=require('body-parser');
const path=require('path');
const users= require('./routes/api/users');

const app=express();

//Body Parder Middleware
app.use(BodyParser.urlencoded({extended:false}));
app.use(BodyParser.json());

//DB config
const db= require('./config/key').mongoURL;

//connect to MongoDB
mongoose
    .connect(db)
    .then(()=> console.log('MongoDB connected'))
    .catch(err=> console.log(err))

app.get('/',(req,res)=> res.send('My backend works'));

//Use Routes
app.use('/api/users',users);



const port= process.env.PORT || 5000; //Step 1 for production

//Step 3
if (process.env.NODE_ENV === 'production'){
    app.use(express.static ('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    })
}

app.listen(port, ()=> console.log(`Server is running on port ${port}`))