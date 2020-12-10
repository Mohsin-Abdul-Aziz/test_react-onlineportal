const express= require('express');
const mongoose=require('mongoose');
const BodyParser=require('body-parser');
const path=require('path');
const passport=require('passport');
const users= require('./routes/api/users');
const profile= require('./routes/api/profile');

const multer = require('multer');

const app=express();

//Body Parder Middleware 
app.use(BodyParser.urlencoded({extended:false}));
app.use(BodyParser.json());

//For file uploading 
app.use(express.static(__dirname + '/public'));



//DB config
const db= require('./config/key').mongoURL;

//connect to MongoDB
mongoose
    .connect(db)
    .then(()=> console.log('MongoDB connected'))
    .catch(err=> console.log(err))

//Passport Config

require('./config/passport')(passport)

//Use Routes
app.use('/api/users',users);
app.use('/api/profile',profile)


const port= process.env.PORT || 5000; //Step 1 for production

//Step 3

    if (process.env.NODE_ENV === 'production'){
          app.use(express.static ('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
 }

app.listen(port, ()=> console.log(`Server is running on port ${port}`))