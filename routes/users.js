const express = require('express');
const mongoose=require('mongoose');
require('express-async-errors');
const config = require('config');
const _ = require("lodash");
const router =express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/authorization');
const {User,validate}=require("../models/users");
//--creating a users--
router.post('/', auth,async (req,res) => {
   //validate the input parameters
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  // check if user already exists in our DB
  let user = await User.findOne({email : req.body.email});
  if(user) return res.status(400).send("User already registered");
   // create user object to save in the DB
   user = new User(_.pick(req.body , ["name" , "email" , "password"]));
   //Hash the password
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password,salt);
   //save and return the created user
   await user.save();
   const token = user.generateAuthToken();
//    return token;
   res.header("x-auth-token",token)
      .send(_.pick(user, ["_id" , "name", "email"]));

//    res.send(_.pick(user, ["_id" , "name", "email"]));
});
// getting all users list
router.get('/',async (req,res) =>{
    const user = await User.find();
     res.send(user);
    
});
// getting by id
router.get('/:id',async (req,res) =>{
    const id = req.params.id;
   const user = await User.findById({_id : id});
    res.send(user);
    
});
// updating a user
router.put('/:id',async (req,res) =>{
    const id = req.params.id;
    const user = await User.update({_id : id},req.body);
    res.send(user);
    
});
// deleting a user
router.delete('/:id',async (req,res) =>{
    const id = req.params.id;
        const user = await User.deleteOne({_id : id});
        res.status(200).send(user);
    
})

module.exports=router;

