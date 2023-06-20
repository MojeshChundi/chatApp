const User = require("../models/signup");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.Authenticate = async (req, res, next) => {
  try {
    const token = req.headers.auth;
    if (!token) {
      console.log("there is no token available");
    } else {
      const user = jwt.verify(token, process.env.JWT_KEY);
      User.findByPk(user.id)
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((err) => console.log(err));
    }
  } catch (err) {
    console.log(err);
  }
};
