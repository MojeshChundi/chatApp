const express = require("express");

const router = express.Router();

const loginControllers = require("../controllers/chat");
const authControllers = require("../middleware/auth");

router.post("/message", authControllers.Authenticate, loginControllers.chat);

module.exports = router;
