const { BlogController } = require("../../controllers/admin/blog.controller");
const { stringToArray } = require("../../middleware/stringToArray");
const { uploadFile } = require("../../unitls/multer");

const router = require("express").Router();
/**
 * @swagger
 * /admin/blog:
 *  get:
 *      tags: [Blog(Admin-Panel)]
 *      summary: get all blogs
 *      responses:
 *          200:
 *              description: success
 */

router.get("/", BlogController.getListOfBlog);

/**
 * @swagger
 * /admin/blog/add:
 *  post:
 *      tags: [Blog(Admin-Panel)]
 *      summary: Create a new blog
 *      consumer:
 *          -multipart/form-data
 *      parameters:
 *          -   in: formData
 *              name: title
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: text
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: short_text
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: tags
 *              example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *              type: string
 *          -   in: formData
 *              name: category
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: image
 *              required: true
 *              type: file
 *      responses:
 *          201: 
 *              description: created
 */
router.post("/add", uploadFile.single("image"), stringToArray("tags"), BlogController.createBlog);
module.exports = {
    AdminApiBlogRoutes : router
}