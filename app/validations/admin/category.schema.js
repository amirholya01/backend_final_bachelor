const Joi = require("@hapi/joi");
const { MongoIdPattern } = require("../../unitls/constants");

const addCategorySchema = Joi.object({
    title: Joi.string().min(2).max(30).error(new Error("The category title is not correct")),
    parent: Joi.string().allow('').pattern(MongoIdPattern).error(new Error("The ID is not correct"))
})
const updateCategorySchema = Joi.object({
    title: Joi.string().min(2).max(30).error(new Error("The category title is not correct"))
})
//const { MongoIdPattern } = require("../../unitls/constants");
// const {body} = require("express-validator");
// const { CategoryModel } = require("../../models/categories");
// function addCategoryValidation(){
//     return [
//         body("title").isString().isLength({min: 2, max: 30}).withMessage("The category title is not correct"),
//         // body("parent").isString().isEmpty().matches(MongoIdPattern).withMessage("The ID is not correct")
//         body("parent").isEmpty().custom(async (value, ctx) => {
//             if(value){
//                 // Regular expression for validating the username: starts with a lowercase letter, followed by lowercase letters, numbers, underscores, or periods.
//                 // Special characters as '!' '#' '@' are not allowed
//                 const mongoRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

//                 if(mongoRegex.test(value)){
//                     // const parent = await UserModel.findOne({username : value})
//                     const parent = await CategoryModel.findOne({parent: value})
//                     if(!parent) throw "The ID is not correct"
//                     return true
//                 }
                
//                 throw "this parent isn't allowed"
//             }
            
//         }),
//     ]
// }

module.exports = {
      addCategorySchema,
      updateCategorySchema
     //addCategoryValidation
}