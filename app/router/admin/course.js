const { stringToArray } = require("../../middleware/stringToArray");
const { uploadFile } = require("../../unitls/multer");
const {CourseController} = require("../../controllers/admin/course.controller");
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


// /**
//  * @swagger
//  *  components:
//  *      schemas:
//  *          Insert-Course:
//  *              type: object
//  *              required: 
//  *                  -   title
//  *                  -   short_text
//  *                  -   text
//  *                  -   tags
//  *                  -   category
//  *                  -   price
//  *                  -   discount
//  *                  -   image
//  *                  -   type
//  *              properties:
//  *                  title:
//  *                      type: string
//  *                      description: the title of course
//  *                  short_text:
//  *                      type: string
//  *                      description: the short description about course
//  *                  text:
//  *                      type: string
//  *                      description: the description of course
//  *                  tags:
//  *                      type: array
//  *                      description: tags
//  *                  category:
//  *                      type: string
//  *                      description: category of course
//  *                      example: mongo id
//  *                 price:
//  *                      type: string
//  *                      description: the price of course
//  *                 image:
//  *                      type: string
//  *                      description: the image of course
//  *                      format: binary
//  *                 type:
//  *                      type: string
//  *                      description: the type of course
//  *                      example: free-cash-special
//  */
// /**
//  * @swagger
//  * /admin/course/add:
//  *  post:
//  *      tags:[Course(Admin-Panel)]
//  *      summary: create a new course
//  *      requestBody:
//  *          required: true
//  *          content:
//  *              multipart/form-data:
//  *                  schema:
//  *                      $ref: '#/components/schemas/Insert-Course
//  *      responses:
//  *          201:
//  *              description: success
//  */


/**
 * @swagger
 * /admin/category/add:
 *  post:
 *      summary: Add new course
 *      tags: [Course(Admin-Panel)]
 *      consumes:
 *          -   multipart/form-data:
 *      parameters:
 *      -   name: title
 *          required: true
 *          in: formData
 *          type: string
 *      -   name : short_text
 *          in: formData
 *          type: string
 *          required: true
 *      -   name : text
 *          in: formData
 *          type: string
 *          required: true
 *      -   name : tags
 *          in: formData
 *          type: array
 *          required: true
 *      -   name : category
 *          in: formData
 *          type: string
 *          required: true
 *      -   name : price
 *          in: formData
 *          type: string
 *          required: true
 *      -   name : image
 *          in: formData
 *          items:
 *              type: string
 *              format: binary
 *          required: true
 *      -   name : type
 *          in: formData
 *          type: string
 *          required: true
 *      responses:
 *          201:
 *              description: success
 */

router.post("/add", uploadFile.single("image"), stringToArray("tags"), CourseController.createCourse);
module.exports = {
    AdminApiCourseRoutes : router
}