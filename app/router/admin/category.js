const { CategoryController } = require("../../controllers/admin/category.controller");

const router = require("express").Router();

/**
 * @swagger
 * /admin/category/add:
 *  post:
 *      summary: Add new category
 *      tags: [admin-panel]
 *      parameters:
 *      -   name: title
 *          description: The title of category must be at least 2 characters and maximum length 30 characters
 *          required: true
 *          in: formData
 *          type: string
 *      -   name : parent
 *          in: formData
 *          type: string
 *          required: false
 *      responses:
 *          201: 
 *              description: success
 */

router.post("/add", CategoryController.addCategory);

module.exports = {
    CategoryRoutes : router
}