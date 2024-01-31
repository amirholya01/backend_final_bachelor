const { CourseController } = require("../../controllers/admin/course.controller");

const router = require("express").Router();

/**
 * @swagger
 * /admin/course/list:
 *  get:
 *      tags: [Course(Admin-Panel)]
 *      summary: get all courses - list of courses
 *      parameters:
 *          -   in: query
 *              name: search
 *              type: text
 *              description: searching from the title, short text, and text in the course database 
 *      responses:
 *          200:
 *              description: success
 */
router.get("/list", CourseController.getListOfCourse);




module.exports = {
    AdminApiCourseRoutes : router
}