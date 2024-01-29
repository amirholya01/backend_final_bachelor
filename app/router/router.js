const { registerValidator } = require("../validations/user/auth.schema");
const { AdminRoutes } = require("./admin/admin.routes");
const { IndexRoutes } = require("./api");
const { UserRoutes } = require("./user/user");

const router = require("express").Router();

router.use("/admin", AdminRoutes);
router.use("/user", registerValidator(), UserRoutes);
router.use("/", IndexRoutes);

module.exports = {
    AllRoutes : router
}