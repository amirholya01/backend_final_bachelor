const JWT = require("jsonwebtoken");
const createError = require("http-errors");

const { ACCESS_TOKEN_SECRET_KEY } = require("../unitls/constants");
const { UserModel } = require("../models/users");

function verifyAccessToken(req, res, next){
    const headers = req.headers;
    const [bearer, token] = headers?.accessToken?.split(" ") || [];
    if(token && bearer?.toLowerCase() === "bearer"){
        JWT.decode(token, ACCESS_TOKEN_SECRET_KEY, async(err, payload) => {
            if(err) return next(createError.Unauthorized("Please log into your account"))
            // console.log(payload, err);
            const {username} = payload || {}; 
            const user = await UserModel.findOne({username}, {password: 0, token: 0});
            if(!user)return next( createError.Unauthorized("The user account was not found"))
            req.user = user;
            return next();
        })
    }
    return next(createError.Unauthorized("Please log into your account"))
  
}


module.exports = {
    verifyAccessToken
}