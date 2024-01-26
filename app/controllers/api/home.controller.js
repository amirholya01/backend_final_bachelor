const Controller = require("../controller");

class HomeController extends Controller{
    indexPage(req, res, next){
        try {
            return res.status(200).json({
                statusCode: 200,
                message: "Welcome to Final Project App-BackEnd"
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = {
    HomeController : new HomeController()
}