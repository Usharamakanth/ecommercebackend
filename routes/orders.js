const express = require('express');
const mongoose=require('mongoose');
const _ = require("lodash");
const router =express.Router();
const Order = require('../models/orders');
// creating a order
router.post('/',async (req,res) =>{
    // const {error} = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message);
    const order = new Order({
        user : req.body.user,
        product : req.body.product
    })
    await order.save();
    res.send(order);
//     order = new Order(_.pick(req.body , ["user" , "product" ]));
//     await order.save();
//    res.send(_.pick(order, ["_id" , "name", "product"]));
});
module.exports = router;