const User=require('./../models/userModel');
const jwt = require('jsonwebtoken');

const signToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
     expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken=(user,statusCode,res)=>{
  const token=signToken(user._id);
  const cookieOptions={
    expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
    httpOnly:true
  };

  res.cookie('jwt',token,cookieOptions);
  user.password=undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data:{
      user
    }
  });
};

exports.signup = async (req,res,next) => {
     const newUser = await User.create(req.body);
     createSendToken(newUser,201,res);
};

exports.login =async (req,res,next)=>{
  const {email,password}=req.body;
   if(!email || !password){
    res.status(400).json({status:'fail',message:'Please provide email and password'});
   }

   const user =await User.findOne({email}).select('+password');
   if(!user || !(await user.correctPassword(password, user.password))) {
    res.status(400).json({status:'fail',message:'Incorrect email or password'});
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
};