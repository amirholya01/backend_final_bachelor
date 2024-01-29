const { CategoryModel } = require("../../models/categories");
const { addCategorySchema } = require("../../validations/admin/category.schema");
const Controller = require("../controller");
const createError = require("http-errors");

class CategoryController extends Controller{

    async addCategory(req, res, next){
        try {
            await addCategorySchema.validateAsync(req.body);
            const {title, parent} = req.body;
            const category = await CategoryModel.create({title, parent});
            if(!category) throw createError.InternalServerError("Server Error");
            return res.status(201).json({
                data: {
                    statusCode: 201,
                    message: "Category added successfully"
                }
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    CategoryController : new CategoryController()
}