const {  AdminApiCategoryRoutes } = require("./category");
const { AdminApiCourseRoutes } = require("./course");

const router = require("express").Router();
/**
 * @swagger
 * tags:
 *      -   name: Admin-Panel
 *          description: admin-panel
 *      -   name: Course(Admin-Panel)
 *          description: all methods and routes about course section
 *      -   name: Category(Admin-Panel)
 *          description: all methods and routes about category section
 */
router.use("/category", AdminApiCategoryRoutes);
router.use("/course", AdminApiCourseRoutes);
module.exports = {
    AdminRoutes : router
}