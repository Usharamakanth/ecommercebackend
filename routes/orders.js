const express = require('express');
const mongoose=require('mongoose');
const _ = require("lodash");
const auth = require('../middlewares/authorization');
const router =express.Router();
require('express-async-errors');
const Order = require('../models/orders');
// creating a order
router.post('/',async (req,res) =>{
    const order = await new Order(_.pick(req.body,['user','product','productname']));
    await order.save();
    res.send(order);
});
// getting all orders
router.get('/',async(req,res) =>{
    const order = await Order.find();
    res.send(order);
});
// getting product by id
router.get('/:id',async(req,res) =>{
    const id = req.params.id;
    const order = await Order.findById({_id : id});
    res.send(order);
});
// updating product by id
router.put('/:id',async(req,res) =>{
    const id = req.params.id;
    const order = await Order.update({_id : id},req.body);
    res.send(order);
})
// delete order by id
router.delete('/:id',async(req,res) =>{
    const id = req.params.id;
    const order = await Order.deleteOne({_id : id});
    res.send(order);
})
module.exports = router;