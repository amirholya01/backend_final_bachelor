const Controller = require("../../controller");
const {validationResult} = require("express-validator");
const {UserModel} = require("../../../models/users");
const {hashString, signAccessToken} = require("../../../unitls/functions");
const bcrypt = require("bcrypt");
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


    async login(req, res, next){
        try {
            const {username, password} = req.body;

            // Find the user by their username in the database
            const user = await UserModel.findOne({username}).select('_id username password');

            // If no user is found, throw an error
            if(!user) throw {status : 401, message : "The username or password is incorrect"}

            // Compare the password entered by the user to the hash stored in the database
            const compareResult = bcrypt.compareSync(password, user.password);

            // If the passwords don't match, throw an error
            if(!compareResult) throw {status : 401, message : "The username or password is incorrect"}
            

            const accessToken = await signAccessToken(user._id); 

            user.token = accessToken
            // Save the token to the user's record in the database
            await user.save()

               // Send a response with the token to the user
               return res.status(200).json({
                status: 200,
                success: true,
                message: "You have successfully logged in to your account.",
                accessToken
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    UserAuthController : new UserAuthController()
}