const jwt = require('jsonwebtoken');

const authenticate = (req,res,next) => {
    console.log("Inside middleWare");

    const token = req.headers.authorization?.split(' ')[1];

    if(!token) return res.status(401).json({message:"No Token Provided"});

    try{
        const decoded = jwt.verify(token,process.env.JWTKEY);
        req.user = decoded;
        next();

    }catch(err){
        res.status(401).json("Invalid or  token Missing")
    }
    
}

module.exports = authenticate;