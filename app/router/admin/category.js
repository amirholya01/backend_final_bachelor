const {
  CategoryController,
} = require("../../controllers/admin/category.controller");
const {
  addCategoryValidation,
} = require("../../validations/admin/category.schema");

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

/**
 * @swagger
 * /admin/category/all:
 *  get:
 *      tags: [admin-panel]
 *      summary: get all categories
 *      responses:
 *          200:
 *              description: success
 */
router.get("/all", CategoryController.getAllCategory);

// /**
//  * @swagger
//  * /admin/category/{id}:
//  *  get:
//  *      tags: [admin-panel]
//  *      summary: get category by ID
//  *      parameters:
//  *      -   in: path
//  *          name: id
//  *          type: string
//  *          required: true
//  *      responses:
//  *          200:
//  *              description: success
//  */
// router.get("/:id", CategoryController.getCategoryById);




/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *      tags: [admin-panel]
 *      summary: get all parents or show all header of categories
 *      responses:
 *          200:
 *              description: success
 */
router.get("/parents", CategoryController.getAllParents);

/**
 * @swagger
 * /admin/category/children/{parent}:
 *  get:
 *      tags: [admin-panel]
 *      summary: get children of a special parent ---- A subset of a parent
 *      parameters:
 *      -   in: path
 *          name: parent
 *          type: string
 *          required: true
 *      responses:
 *          200:
 *              description: success
 */
router.get("/children/:parent",CategoryController.getChildOfParent);

/**
 * @swagger
 * /admin/category/remove/{id}:
 *  delete:
 *      tags: [admin-panel]
 *      summary: remove a category with id(object-id)
 *      parameters:
 *      -   in: path
 *          name: id
 *          type: string
 *          required: true
 *      responses:
 *          200:
 *              description: success
 */
router.delete("/remove/:id", CategoryController.removeCategory);
module.exports = {
  CategoryRoutes: router,
};
