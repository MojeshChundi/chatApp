const express = require("express");

const router = express.Router();

const loginControllers = require("../controllers/login");

router.post("/login", loginControllers.login);

module.exports = router;
