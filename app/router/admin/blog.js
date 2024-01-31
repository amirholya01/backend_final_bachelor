const { BlogController } = require("../../controllers/admin/blog.controller");

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
 *      responses:
 *          201: 
 *              description: created
 */
router.post("/add", BlogController.createBlog);
module.exports = {
    AdminApiBlogRoutes : router
}