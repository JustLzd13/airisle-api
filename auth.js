const jwt = require("jsonwebtoken");
const secret = "moviesCommentAPI";

module.exports.createAccessToken = (user) => {
    const data = {
        id : user._id,
        email : user.email,
        isAdmin : user.isAdmin
    };
    return jwt.sign(data, secret, {});
    
};



module.exports.verify = (req, res, next) => {
    console.log("headers:", req.headers.authorization); //checked if this is received

    let token = req.headers.authorization;

    if(typeof token === "undefined"){
        return res.send({ auth: "Failed. No Token" }); //no token
    } else {
        console.log("token:", token);     
        token = token.slice(7, token.length);

        console.log("sliced token:", token);


        jwt.verify(token, secret, function(err, decodedToken){
            
            if(err){
                return res.status(403).send({
                    auth: "Failed",
                    message: err.message
                });

            } else {

                console.log("result from verify method:")
                console.log(decodedToken);
                req.user = decodedToken;
                next();
            }
        })
    }
};

module.exports.verifyAdmin = (req, res, next) => {

    if(req.user.isAdmin){
        next();
    } else{
        return res.status(403).send({
            auth: "Failed",
            message: "Action Forbidden"
        })
    }

}




//[auth.js] Middleware to check if the user is authenticated
module.exports.isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}