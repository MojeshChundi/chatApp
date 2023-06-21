const express = require("express");

const router = express.Router();

const signupControllers = require("../controllers/signup");

router.post("/signup", signupControllers.signUp);
router.get("/getusers", signupControllers.getusers);

module.exports = router;
