const { CategoryModel } = require("../../models/categories");
const { addCategorySchema } = require("../../validations/admin/category.schema");

const Controller = require("../controller");
const createError = require("http-errors");
const mongoose = require("mongoose");

class CategoryController extends Controller{

    async addCategory(req, res, next){
        try {
            // const error = validationResult(req);
            // if(error) throw createError.InternalServerError("Server Error-validation")
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

    // async getCategoryById(req, res, next){
    //     try {
    //         const {id : _id} = req.params;
    //         const category = await CategoryModel.aggregate([
    //             {
    //                 $match: { _id : mongoose.Types.ObjectId(_id)}
    //             },
    //             {
    //                 $lookup: {
    //                     from: "categories",
    //                     localField: "_id",
    //                     foreignField: "parent",
    //                     as: "children"
    //                 }
    //             },
    //             {
    //                 $project: {
    //                     __v: 0,
    //                     "children.__v": 0,
    //                     "children.parent": 0
    //                 }
    //             }
               
    //         ])
    //         return res.status(200).json({
    //             data: {
    //                 statusCode: 200,
    //                 category
    //             }
    //         })
    //     } catch (error) {
    //         next(error);
    //     }
    // }
    async getAllCategory(req, res, next){
        try {
            // const category = await CategoryModel.aggregate([
            //     {
            //         $lookup: {
            //             from: "categories",
            //             localField: "_id",
            //             foreignField: "parent",
            //             as: "children"
            //         }
            //     },
            //     {
            //         $project: {
            //             __v: 0,
            //             "children.__v": 0,
            //             "children.parent": 0
            //         }
            //     },
            //     {
            //         $match: {
            //             parent : undefined
            //         }
            //     }
            // ])
            const category = await CategoryModel.aggregate([
                {
                    $graphLookup: {
                        from: "categories",
                        startWith: "$_id",
                        connectFromField: "_id",
                        connectToField: "parent",
                        maxDepth: 5,
                        depthField: "depth",
                        as: "children"
                    }
                },
                {
                    $project: {
                        __v: 0,
                        "children.__v": 0,
                        "children.parent": 0
                    }
                },
                {
                    $match: {
                        parent : undefined
                    }
                }
            ])
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    category
                }
            })
        } catch (error) {
            next(error);
        }
    }

    //get all parents or show all header of categories
    async getAllParents(req, res, next){
        try {
            const parents = await CategoryModel.find({parent : undefined}, {__v: 0});
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    parents
                }
            })
        } catch (error) {
            next(error);
        }
    }


    //get children of a special parent ---- A subset of a parent
    async getChildOfParent(req, res, next){
        try {
            const{parent} = req.params;
            const children = await CategoryModel.find({parent}, {__v: 0, parent: 0});
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    children
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async removeCategory(req, res, next){
        try {
            const {id} = req.params;
            const category = await this.checkExistCategory(id);
            const deleteResult = await CategoryModel.deleteMany({
                $or: [
                    {_id: category._id},
                    {parent: category.parent}
                 ]
            });
            if(deleteResult.deletedCount == 0) throw createError.InternalServerError("The category was not deleted successfully");
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: "Deleting a category was successfully"
                }
            })
        } catch (error) {
            next(error);
        }
    }

    
    async checkExistCategory(id){
        const category = await CategoryModel.findById(id);
        if(!category) throw createError.NotFound("The category was not found");
        return category;
    }
}

module.exports = {
    CategoryController : new CategoryController()
}