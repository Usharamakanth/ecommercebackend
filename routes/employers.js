const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');
const _ = require('lodash');
const router = express.Router();
const Joi = require('joi');
const auth = require('../middlewares/authorization');
const {Employer,validate} = require('../models/employers');
// creating a employer
router.post('/',auth,async (req,res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
employer = new Employer(_.pick(req.body , ["name","email","designation","address","phonenumber"]));
    await employer.save();
    const token = employer.generateAuthToken();
    res.header("x-auth-token",token)
       .send(_.pick(employer, ["_id" , "name","email","designation","address","phonenumber"]));
});
// getting all employers
router.get('/',async(req,res) =>{
   const employer = await Employer.find();
    res.send(employer);
    
});
// getting employer by id
router.get('/:id',async (req,res) =>{
    const id = req.params.id;
    const employer = await Employer.findById({_id : id});
    res.send(employer);
    
});
// updating employer by id
router.put('/:id',async (req,res) =>{
    const id = req.params.id;
   const employer = await Employer.update({_id : id},req.body);
     res.send(employer);
    
});
// deleting a employer by id
router.delete('/:id',async (req,res) =>{
    const id = req.params.id;
        const employer = await Employer.deleteOne({_id : id}); 
        res.status(200).send(employer);
    
})
module.exports = router;