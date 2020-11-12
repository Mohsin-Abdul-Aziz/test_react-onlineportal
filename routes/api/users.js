const express= require('express');
const router=express.Router();
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const keys=require('../../config/key');
const jwt=require('jsonwebtoken');
const password=require('passport');

//Load User Model

const User=require('../../models/User');

//Load Input validations
const validateRegisterInput=require('../../validation/register');
const validateLoginInput=require('../../validation/login');


//@route GET api/users/getusers
//@desc Get all the users from MongoDB
//@access Public

router.get('/getusers',(req,res)=>{
     User.find()
     .sort({date:-1})
     .then(users=>res.json(users))
     .catch(err=>res.status(404).json({nousersfound:'No Users'}));
});

//@route     GET api/users/current
//@desc      Return current user
//@access    private
router.get('/current',password.authenticate('jwt',{session:false}),(req,res)=>{
   console.log(req.body)
    res.json(req.user);
});

//@route Post api/users/reqister
//@desc Tests users route
//@access Public
router.post('/register',(req,res)=>{

  const {errors,isValid} =validateRegisterInput(req.body);
  
    
  // Check Validation
  if(!isValid){
      return res.status(400).json(errors);
  }

    User.findOne({ email:req.body.email})
        .then(user=>{
            if(user){
                return res.status(400).json({email:"Email already exists"})
            }
            else{
                const avatar=gravatar.url(req.body.email,{
                    s:'200', //size
                    r:'pg', //Rating
                    d:'mm' //Default
                })
                const newUser= new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar,
                    password:req.body.password
                })
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password, salt, (err,hash)=>{
                        if(err) throw err;
                        newUser.password=hash;
                        newUser.save()
                            .then(user=>res.json(user))
                            .catch(err=>console.log(err))
                    })
                })
            }
        })

});

//@route     GET api/users/login
//@desc      Login users / Return JWT Token
//@access    public

router.post('/googlelogin',(req,res)=>{
          //console.log(req.body)
//Find user by email
User.findOne({email:req.body.profileObj.email})
  .then(user => {
    //check for user
    if (!user) {
    const uemail=req.body.profileObj.email;
    const upassword=req.body.profileObj.name;
    const uname=req.body.profileObj.name;
    const uid=req.body.profileObj.googleId;
    const uavatar=req.body.profileObj.imageUrl;

      const newUser = new User({
        name: uname,
        email: uemail,
        avatar:uavatar,
        password: upassword
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(success => {
              if (success) {
                const payload = {
                  id: uid,
                  name: uname,
                  avatar: uavatar
                } //Create JWT Payload
                //Sign Token
                jwt.sign(
                  payload,
                  keys.secretOrKey, {
                    expiresIn: 3600
                  },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token
                    })
                  });
              }
            })
            .catch(err => console.log(err))
        })
      })
    } else {
      res.json({
        success: true,
        token: 'Bearer ' + req.body.tokenId
      })
    }
  })
    //console.log(req.body.tokenId)
})
//@route     GET api/users/login
//@desc      Login users / Return JWT Token
//@access    public

router.post('/login',(req,res)=>{

  const {errors,isValid} =validateLoginInput(req.body);

  // Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    const email=req.body.email;
    const password=req.body.password;

    //Find user by email
    User.findOne({email})
        .then(user=>{
            //check for user
            if(!user){
                errors.email='User not found'
                return res.status(400).json(errors);
            }

            //Check password
            bcrypt.compare(password,user.password)
                .then(isMatch=>{
                    if(isMatch){
                        //User Matched
                        const payload={ id:user.id,name:user.name,avatar:user.avatar} //Create JWT Payload
                        //Sign Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn:3600},
                            (err,token)=>{
                                res.json({
                                    success:true,
                                    token:'Bearer '+token
                            })
                        });
                    }
                    else{
                        errors.password='Password incorrect'
                        //return res.status(400).json({errors:"Password incorrect"});
                        return res.status(400).json(errors);

                    }
                })
        })
})

module.exports=router;