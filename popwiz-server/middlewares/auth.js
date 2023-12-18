const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //1.check if there is a token and get the token from req
    //the token is sent in the req header
    const token = req.header("Authorization");
    if (!token) return res.status(401).send("Access denied, no valid token");
    //2.check the token
    const payload = jwt.verify(token, process.env.jwtKey);
    //3.save the payload(the hidden details in the token) in the req
    req.payload = payload;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};
