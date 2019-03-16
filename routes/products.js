const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');
const _ = require('lodash');
const router = express.Router();
const Joi = require('joi');
const auth = require('../middlewares/authorization');
const {Product,validate} = require('../models/products');

// creating a product
router.post('/',auth,async (req,res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    product = new Product(_.pick(req.body , ["name" , "price" , "category"]));
    await product.save();
    
    const token = product.generateAuthToken();
    res.header("x-auth-token",token)
       .send(_.pick(product, ["_id" , "name", "price","category"]));
});
// getting all products
router.get('/',async(req,res,next) =>{
    const product = await Product.find();
    res.send(product);
});
// getting product by id
router.get('/:id',async (req,res) =>{
    const id = req.params.id;
    const product = await Product.findById({_id : id});
    res.send(product);
    
});
// getting product by category
router.get('/:category',async(req,res) =>{
    const category = req.query.filterByCategory;
        const product = await Product.findByCategory({_category:category});
        res.send(product);
    
});
// updating a product by id
router.put('/:id',async (req,res) =>{
    const id = req.params.id;
        const product = await Product.update({_id : id},req.body);
        res.send(product);
    
});
// deleting a product by id
router.delete('/:id',async (req,res) =>{
    const id = req.params.id;
        const product = await Product.deleteOne({_id : id}); 
        res.send(product);
    
})
module.exports = router;