const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('Joi');
const config = require('config');
// const jwt = require('jsonwebtoken');
const productSchema = new mongoose.Schema({
    name:{type:String,minlength:4,required:true},
    category:{type:String,required:true,
              enum:['Men','Women','kids']},
    price:Number,
    description:String,
    brand:String,
    quantity:Number,
    barcode:Number,
});
productSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},config.get('app.jwtPrivateKey'));
    return token;
}
const Product = mongoose.model('Product',productSchema);
function validateProduct(product){
    const schema = {
        name:Joi.string().min(3).max(50).required(),
        price : Joi.number().required(),
        category : Joi.string().required(),
    }
    return Joi.validate(product,schema);
}
module.exports.Product = Product;
module.exports.validate = validateProduct;