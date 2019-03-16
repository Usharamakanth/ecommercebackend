const express = require('express');
const mongoose=require('mongoose');
const router =express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');
// const config = require('config');

const {User}=require("../models/users");

router.post('/', async (req,res) => {
   //validate the input parameters
  const {error} = validateCredentials(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  // check if user email exists in our DB
  let user = await User.findOne({email : req.body.email});
  if(!user) return res.status(400).send("Invalid email. Please try again");
  // check if the given password is correct
 const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
 if(!isPasswordValid) return res.status(400).send("Invalid password. Please try again");
//  const token = jwt.sign({_id: user._id} , config.get('app.jwtPrivateKey'));
//  res.header("x-auth-token",token)
//  .send();

//  generating jwt token
 const token = user.generateAuthToken();
 res.header("x-auth-token",token)
    res.send(true);
});

function validateCredentials(req){
   const schema = {
       email : Joi.string().min(5).max(255).required().email(),
       password : Joi.string().min(5).max(255).required(),
   }
   return Joi.validate(req, schema);
}
module.exports=router;

