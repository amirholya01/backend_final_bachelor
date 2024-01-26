const Controller = require("../../controller");
const {validationResult} = require("express-validator");
const {UserModel} = require("../../../models/users");
const {hashString} = require("../../../unitls/functions");
class UserAuthController extends Controller{
    async register(req, res, next){
        try { 
        // Extract the user information from the request body
        const {username, password, confirmPassword, email} = req.body;

        // Hash the user's password using bcrypt
        const hash_password = hashString(password) 

        // Create a new user object in the database
        const user = await UserModel.create({ username, email, confirmPassword, password: hash_password })
        
        // If the username is already in use, catch the error and throw a custom error object
        .catch(err => {
           if(err?.code == 11000){
               throw {status : 400, message : "The username is already in use"}
           }
        })

        // Return the created user
        return res.json(user)
        } 

        catch (error) {
        next(error)
        }
    }
}

module.exports = {
    UserAuthController : new UserAuthController()
}