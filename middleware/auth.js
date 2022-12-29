require("dotenv").config();
const jwt = require('jsonwebtoken');

const config = process.env;

module.exports = () => {
return async (req,res,next) =>{
    
        if (req.headers.authorization == undefined || req.headers.authorization == null ) {
            
            return res.status(401).json({ success: false, message: "Token is not define or null" });
        }
    try{
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, config.TOKEN_KEY);
        next()

    }catch(error){
        return res.status(401).json({success: false, message: "Unauthorization" });

    }
}
}
