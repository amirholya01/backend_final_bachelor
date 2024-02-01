const { CourseModel } = require("../../models/courses");
const { createCourseSchema } = require("../../validations/admin/course.schema");
const Controller = require("../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const path = require("path");
const createError = require("http-errors");

class CourseController extends Controller{

    async getListOfCourse(req, res, next){
        try {
            const {search} = req.query;
            let courses;
            if(search)
                 courses = await CourseModel.find({$text: {$search: search}}).sort({_id: -1});
            else
                courses = await CourseModel.find({}).sort({_id: -1});
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    courses
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async addCourse(req, res, next){
        try {
            await createCourseSchema.validateAsync(req.body);
            const{ fileUploadPath, filename} = req.body;
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/")
            const {title, text, tags, category} = req.body;
            const teacher = req.user._id;
            const course = await CourseModel.create({
                title,
                text,
                tags,
                category,
                image,
                time: "00.00.00",
                teacher 
            })
            if(!course?._id) throw createError.InternalServerError("The course was not registered")
            return res.status(HttpStatus.CREATED).json({
                statusCode : HttpStatus.CREATED,
                data: {
                    course
                }
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports ={
    CourseController : new CourseController()
}