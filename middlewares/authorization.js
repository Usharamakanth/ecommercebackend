const jwt =require('jsonwebtoken');
const config = require('config');
function authorization(req,res,next) {
    console.log("Authorizing user.....");
    const token = req.header("x-auth-token");
    if(!token) return res.status(401).send('access denied.no token provided');
    try{
        const decodedPayload = jwt.verify(token,config.get('app.jwtPrivateKey'));
        req.user = decodedPayload;
        next();
    }catch(error){
        res.status(400).send('Access denied.invalid token');
    }
}
module.exports = authorization;