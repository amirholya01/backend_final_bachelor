// const Joi = require("@hapi/joi");
// const createError = require("http-errors");
// const { MongoIDPattern } = require("../../unitls/constants");
// const createCourseSchema = Joi.object({
//     title : Joi.string().min(1).max(30).error(createError.BadRequest("The tile of course is not correct")),
//     text: Joi.string().error(createError.BadRequest("The sending text is not correct")),
//     tags: Joi.array().min(0).max(20).error(createError.BadRequest("Tags can not be more than 20 tags")),
//     category: Joi.string().pattern(MongoIDPattern).error(new Error("The desired category was not found")),
//     // discountedPrice: Joi.number().error(createError.BadRequest("The entered price is not correct")),
//     // price: Joi.number().error(createError.BadRequest("The entered price is not correct")),
//     // discount: Joi.number().error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
//     // type: Joi.string().regex(/(free|cash|special)/i),
//     filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("The sending image is not correct")),
//     fileUploadPath : Joi.allow()
// });

// const createCourseSchema = Joi.object({
//     title: Joi.string().min(1).max(30).error(createError.BadRequest("The title of the course is not correct")),
//     text: Joi.string().error(createError.BadRequest("The sending text is not correct")),
//     tags: Joi.array().min(0).max(20).error(createError.BadRequest("Tags cannot be more than 20")),
//     category: Joi.string().pattern(MongoIDPattern).error(new Error("The desired category was not found")),
//     filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("The sending image is not correct")),
//     fileUploadPath: Joi.string().allow(null).error(createError.BadRequest("The file upload path is not correct")),
// });

const {body} = require("express-validator");
function createCourseSchema(){

    return[
        body("title").isLength({min: 1, max: 30}).withMessage("The title of course must be more than 1 character and less than 30 characters")
            .custom((value, ctx) => {
                if(!value) throw "title should't be empty";
                return true;
            }),
        body("text").isString().withMessage("The sending text is not correct"),
        body("tags").isArray({min: 0, max: 30}).withMessage("The maximum use of hashtags is 10"),
        body("category").isMongoId().withMessage("The desired category was not found"),
        body("image").custom((value, {req}) => {
            if(!req.file || Object.keys(req.file).length == 0) throw "Please select an image"

            // Validator for checking if the image format is valid
            const ext = path.extname(req.file.originalname).toLowerCase();
            const exts = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
            if(!exts.includes(ext)) throw "The submitted format is not valid";
            
            // Validator for checking if the image size is within limits
            const maxSize = 2 * 2024*2024;
            if(req.file.size > maxSize) throw "The file size cannot be more than 4 megabytes"
            return true
        })
    ]
}

module.exports = {
    createCourseSchema
}