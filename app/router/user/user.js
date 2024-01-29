const { UserAuthController } = require("../../controllers/user/auth/auth.controller");
const { loginValidation } = require("../../validations/user/auth.schema");

const router = require("express").Router();


/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: Login and Register
 */
/**
 * @swagger
 *  /user/register:
 *      post:
 *          summary: register user
 *          tags: [Authentication]
 *          parameters:
 *          -   name: username
 *              description: The username must be at least 3 characters
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: email
 *              description: Please enter the correct email format
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: password
 *              description: The password should at least be between 6 and 16 characters
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: in-authorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/register", UserAuthController.register);


/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: Login and Register
 */
/**
 * @swagger
 *  /user/login:
 *      post:
 *          summary: login user
 *          tags: [Authentication]
 *          parameters:
 *          -   name: username
 *              description: The username must be at least 3 characters
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: password
 *              description: The password should at least be between 6 and 16 characters
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: in-authorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/login", loginValidation(), UserAuthController.login);


router.post("/refresh-token", UserAuthController.refreshToken);

module.exports = {
    UserRoutes : router
}