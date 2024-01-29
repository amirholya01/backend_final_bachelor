const { CategoryRoutes } = require("./category");

const router = require("express").Router();
/**
 * @swagger
 * tags:
 *  name: admin-panel
 *  description: Login and Register
 */
router.use("/category", CategoryRoutes);

module.exports = {
    AdminRoutes : router
}