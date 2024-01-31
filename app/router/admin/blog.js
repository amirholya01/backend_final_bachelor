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
module.exports = {
    AdminApiBlogRoutes : router
}