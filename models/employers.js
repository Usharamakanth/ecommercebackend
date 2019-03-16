const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('config');

const employerSchema = new mongoose.Schema({
   name : {
       type :String,
       required : true,
       minlength : 5,
       maxlength : 55
   },
   email : {
       type :String,
       required : true,
       minlength : 5,
       maxlength : 255,
       unique : true,
   },
   designation : {
       type :String,
       required : true,
       minlength : 5,
       maxlength : 255
   },
   address : {
    type :String,
    minlength : 5,
    maxlength : 255
   },
   phonenumber : {
       type : Number,required : true,
   },
});
employerSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},config.get('app.jwtPrivateKey'));
    return token;
}
const Employer = mongoose.model('Employer',employerSchema);
function validateEmployer(employer){
  const schema = {
      name : Joi.string().min(5).max(55).required(),
      email : Joi.string().min(5).max(255).required().email(),
      designation : Joi.string().min(5).max(255).required(),
      address : Joi.string().min(5).max(255),
      phonenumber : Joi.number().required(),
  }
  return Joi.validate(employer, schema);
}

exports.Employer = Employer;
exports.validate = validateEmployer;
