const bcrypt = require("bcrypt");
const User = require("../models/signup");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      console.log("please enter email and the password!");
    }

    const user = await User.findAll({ where: { email: email } });

    if (user.length === 0) {
      res.status(404).json({ message: "user does not exist!" });
    } else {
      bcrypt.compare(password, user[0].password, function (err, result) {
        if (err) {
          console.log("bcrypt error!");
        }
        if (result === false) {
          res.status(401).json({ message: "wrong password!" });
        }
        if (result === true) {
          res.status(201).json({
            message: "success",
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};
