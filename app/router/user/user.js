const { UserAuthController } = require("../../controllers/user/auth/auth.controller");
const { loginValidation } = require("../../validations/user/auth.schema");

const router = require("express").Router();



router.post("/register", UserAuthController.register);
router.post("/login", loginValidation(), UserAuthController.login);

module.exports = {
    UserRoutes : router
}