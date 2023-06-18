const express = require("express");

const router = express.Router();

const signupControllers = require("../controllers/signup");

router.post("/signup", signupControllers.signUp);

module.exports = router;
