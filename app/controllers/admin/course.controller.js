const { CourseModel } = require("../../models/courses");
const Controller = require("../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
class CourseController extends Controller{

    async getListOfCourse(req, res, next){
        try {
            const courses = await CourseModel.find({}).sort({_id: -1});
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
}

module.exports ={
    CourseController : new CourseController()
}