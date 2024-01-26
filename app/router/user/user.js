const { UserAuthController } = require("../../controllers/user/auth/auth.controller");

const router = require("express").Router();



router.post("/register", UserAuthController.register);

module.exports = {
    UserRoutes : router
}