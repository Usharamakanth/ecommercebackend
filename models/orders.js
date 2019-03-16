const mongoose = require('mongoose');
const Joi = require('Joi');
const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",required : true
    },
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "products",required : true
    }
});
module.exports = mongoose.model('Order',orderSchema);