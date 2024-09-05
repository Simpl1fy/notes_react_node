const jwt = require('jsonwebtoken');


// function to generate a json web token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET);
}

// function to verify jwt token
const jwtAuthMiddleware = (req, res, next) => {

    // check whether there is a authorization token in header
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({"Error": "No Token Found"});
    
    // extract the json token from the header
    const token = authorization.split(' ')[1];
    if (!token ) return res.status(401).json({"Error": "Invalid Token"});

    // now verifying the token
    try {
        // verifying the user token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // saving the new token in the request
        req.jwtPayload = decoded;
        next();

    } catch (err) {
        console.error(err);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({"Error": "Token Expired"});
        } else if(err.name === 'JsonWebTokenError') {
            return res.status(401).json({"Error": "Invalid Token"});
        } else {
            return res.status(401).json({"Error": "Authorization Denied"});
        }
    }

}

module.exports = { generateToken, jwtAuthMiddleware }