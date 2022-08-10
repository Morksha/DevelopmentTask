const express = require("express");
const { signup } = require("../controllers/auth");
const { signin } = require("../controllers/auth");
const { signout } = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);

//signout
router.get("/signout", signout);

module.exports = router;