const { AdminApiBlogRoutes } = require("./blog");
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
 *      -   name: Blog(Admin-Panel)
 *          description: all methods and routes about blog section
 */
router.use("/category", AdminApiCategoryRoutes);
router.use("/course", AdminApiCourseRoutes);
router.use("/blog", AdminApiBlogRoutes);
module.exports = {
    AdminRoutes : router
}