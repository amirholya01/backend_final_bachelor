const { registerValidator } = require("../validations/user/auth.schema");
const { IndexRoutes } = require("./api");
const { UserRoutes } = require("./user/user");

const router = require("express").Router();

router.use("/user", registerValidator(), UserRoutes);
router.use("/", IndexRoutes);

module.exports = {
    AllRoutes : router
}