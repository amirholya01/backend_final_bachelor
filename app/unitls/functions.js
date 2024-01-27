const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("./constants");

//hashing function
function hashString(str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt)
}

function signAccessToken(userId){
    return new Promise(async(resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {
            // userId : user._id,
            username : user.username 
        };
        const secret = "";
        const options = {
            expiresIn : "1h"
        };

        JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
            if(err) reject(createError.InternalServerError("Server side error"));
            resolve(token);
        })
    })
}
module.exports = {
    hashString,
    signAccessToken
}