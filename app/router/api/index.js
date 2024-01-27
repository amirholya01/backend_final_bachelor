const { HomeController } = require("../../controllers/api/home.controller");
const { verifyAccessToken } = require("../../middleware/verifyAccessToken");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  name: Index-Page
 *  description: all data and routes of index page
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: index page
 *      tags: [Index-Page]
 *      description: get all data in index page
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: not found
 */
router.get("/", verifyAccessToken, HomeController.indexPage);

module.exports = {
    IndexRoutes : router
}