const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();
// created customs middlewares
const auth = require('./middlewares/authorization');
const logger = require('./middlewares/logger')(__filename);
// const logger = require('./utils/logger');
const error = require('./middlewares/error');


const config = require('config');
const morgan = require('morgan');


// routes adding
const productrouter = require('./routes/products');
const homerouter=require('./routes/home');
const userrouter = require('./routes/users');
const employerrouter = require('./routes/employers');
const orderrouter = require('./routes/orders');
const authrouter = require('./routes/auth');


// connecting to mongodb
mongoose.connect(config.get('db.host'))
        .then(() => console.log("Succefully connected to mongodb...."))
        .catch((err)=> console.log("Failed to connect to db....", err));    

app.use(express.json());
// app.use(auth);
app.use(bodyparser.json());

// using route files
app.use('/api/products',productrouter);
app.use('/api/home',homerouter);
app.use('/api/users',userrouter);
app.use('/api/employers',employerrouter);
app.use('/api/orders',orderrouter);
app.use('/api/auth',authrouter);   
  
//views folder
app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static('public'));

// throwing error
// process.on("unhandledRejection", ex => {
//     logger.error("unhandledRejection occured :",ex);
//  })
 
//  const p = Promise.reject(new Error("Asynchronous error occured "));
//  p.then(() => console.log("DONE"));
 
  

//third party middlewares
app.use(morgan("tiny"));

 app.get('/home',(req,res) =>{
       res.render('index',{appTitle:"Ecommerce BackEnd Project" , message:"Welcome to ECommerce Web Site"});
    })
//posting data using welcome.pug
app.post("/",function(req,res){
    console.log(req.body);
    res.send("Received the request");
})
//to change enivorment set NODE_ENV
console.log("app name: " ,config.get("app.name"));
console.log("mail server host:" ,config.get("mail.host"));

app.use(error);

const port = process.env.ECBPORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
module.exports = server;