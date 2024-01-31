const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constans");
const createCourseSchema = Joi.object({
    title : Joi.string().min(1).max(30).error(createError.BadRequest("The tile of course is not correct")),
    text: Joi.string().error(createError.BadRequest("The sending text is not correct")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("Tags can not be more than 20 tags")),
    category: Joi.string().regex(MongoIDPattern).error(createError.BadRequest("The desired category was not found")),
    discountedPrice: Joi.number().error(createError.BadRequest("The entered price is not correct")),
    price: Joi.number().error(createError.BadRequest("The entered price is not correct")),
    // discount: Joi.number().error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    type: Joi.string().regex(/(free|cash|special)/i),
    filename: Joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("The sending image is not correct")),
    fileUploadPath : Joi.allow()
});


module.exports = {
    createCourseSchema
}