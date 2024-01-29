const { CategoryRoutes } = require("./category");

const router = require("express").Router();
/**
 * @swagger
 * tags:
 *      -   name: Admin-Panel
 *          description: admin-panel
 *      -   name: Category(Admin-Panel)
 *          description: all methods and routes about category section
 */
router.use("/category", CategoryRoutes);

module.exports = {
    AdminRoutes : router
}