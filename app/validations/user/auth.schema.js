const {body} = require("express-validator")
const {UserModel} = require("../../models/users");
function registerValidator(){

    // Define validation rules using express-validator middleware
    return [
        body("username").custom(async (value, ctx) => {
            if(value){
                // Regular expression for validating the username: starts with a lowercase letter, followed by lowercase letters, numbers, underscores, or periods.
                // Special characters as '!' '#' '@' are not allowed
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi

                if(usernameRegex.test(value)){
                    const user = await UserModel.findOne({username : value})
                    if(user) throw "username is duplicate"
                    return true
                }
                
                throw "this username isn't allowed"
            }
            else { throw "username shouldn't be empty" }
        }),

        body("email").isEmail().withMessage("this email is not allowed")
        .custom(async email => {
            const user = await UserModel.findOne({email})
            if(user) throw "email was used before";
            return true;
        }),

        body("password")
        .isLength({min : 6, max : 16}).withMessage("The password should at least be between 6 and 16 characters")
        .custom((value, ctx) => {
            if(!value) throw "password should't be empty";
         /*    if(value !== ctx?.req?.body?.confirm_password) throw "password is not the same"; */
            return true
        })/* ,
        body("confirm_password")
            .notEmpty()
            .withMessage("confirm_password shouldn't be empty") */
    ]

}

module.exports = {
    registerValidator
}