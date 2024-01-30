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
 *      tags: [Category(Admin-Panel)]
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
 *      tags: [Category(Admin-Panel)]
 *      summary: get all categories
 *      responses:
 *          200:
 *              description: success
 */
router.get("/all", CategoryController.getAllCategory);



/**
 * @swagger
 * /admin/category/list-of-all:
 *  get:
 *      tags: [Category(Admin-Panel)]
 *      summary: get all categories without populate
 *      responses:
 *          200:
 *              description: success
 */
router.get("/list-of-all", CategoryController.getAllCategoryWithoutPopulate);


// /**
//  * @swagger
//  * /admin/category/{id}:
//  *  get:
//  *      tags: [Category(Admin-Panel)]
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
 *      tags: [Category(Admin-Panel)]
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
 *      tags: [Category(Admin-Panel)]
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
 *      tags: [Category(Admin-Panel)]
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

/**
 * @swagger
 * /admin/category/update/{id}:
 *  patch:
 *      summary: edit/update category title with object-id
 *      tags: [Category(Admin-Panel)]
 *      parameters:
 *      -   name: id
 *          required: true
 *          in: path
 *          type: string
 *      -   name: title
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *          200:
 *              description: success
 *          500:
 *              description: internal server error
 */
router.patch("/update/:id", CategoryController.editCategoryTitle);

module.exports = {
  AdminApiCategoryRoutes: router,
};
