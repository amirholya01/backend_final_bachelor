const Controller = require("../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
class BlogController extends Controller {
    async getListOfBlog(req, res, next){
        try {
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    blogs: []
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async createBlog(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    BlogController : new BlogController()
}