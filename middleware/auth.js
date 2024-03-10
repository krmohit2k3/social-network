const jwt = require('jsonwebtoken');
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const bearedHeader = req.headers['authorization'];
  if(typeof bearedHeader !== 'undefined'){
    const bearer = bearedHeader.split(" ");
    const token = bearer[1];
    req.token = token;
  }
  else{
    res.send({result:"token is not valid"});
  }

 
  jwt.verify(req.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
    console.log("failed to verify token:", err);
    return res.status(401).send('Failed to authenticate token.');
    }

    console.log('Token decoded successfully:', decoded);
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;


