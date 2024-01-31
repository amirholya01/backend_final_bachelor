const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/users");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constants");

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

function signRefreshToken(userId){
    return new Promise(async(resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {
            // userId : user._id,
            username : user.username 
        };
        const secret = "";
        const options = {
            expiresIn : "1y"
        };

        JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, (err, token) => {
            if(err) reject(createError.InternalServerError("Server side error"));
            resolve(token);
        })
    })
}

function verifyRefreshToken(token){
    return new Promise((resolve, reject) => {
        JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async(err, payload) => {
            if(err) reject(createError.Unauthorized("Please log into your account"))
            // console.log(payload, err);
            const {username} = payload || {}; 
            const user = await UserModel.findOne({username}, {password: 0, token: 0});
            if(!user) reject (createError.Unauthorized("The user account was not found"))
            resolve(username);
        })
    })
}

function deleteFileInPublic(fileAddress) {
    if (fileAddress) {
        const pathFile = path.join(__dirname, "..", "..", "public", fileAddress)
        if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile)
    }
}
function ListOfImagesFromRequest(files, fileUploadPath) {
    if (files?.length > 0) {
        return ((files.map(file => path.join(fileUploadPath, file.filename))).map(item => item.replace(/\\/g, "/")))
    } else {
        return []
    }
}
module.exports = {
    hashString,
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    deleteFileInPublic,
    ListOfImagesFromRequest
}