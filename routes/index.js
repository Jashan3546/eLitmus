const express = require("express");
const router = express.Router();
const home_controller = require("../controllers/home_controller")


console.log("routes file");

router.get("/", home_controller.home)
router.use("/users", require("./users"))



module.exports = router;