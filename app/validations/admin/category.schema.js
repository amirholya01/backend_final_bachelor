const Joi = require("@hapi/joi");
const { MongoIdPattern } = require("../../unitls/constants");

const addCategorySchema = Joi.object({
    title: Joi.string().min(2).max(30).error(new Error("The category title is not correct")),
    patent: Joi.string().allow('').pattern(MongoIdPattern).error(new Error("The ID is not correct"))
})


module.exports = {
    addCategorySchema
}