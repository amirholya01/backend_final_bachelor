const { CourseModel } = require("../../models/courses");
const Controller = require("../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const path = require("path");
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
            const{ fileUploadPath, filename} = req.body;
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/")
            const {title, text, tags, category, price, discount} = req.body;
            return res.status(HttpStatus.CREATED).json({title, text, tags, category, price, discount, image})
        } catch (error) {
            next(error);
        }
    }
}

module.exports ={
    CourseController : new CourseController()
}