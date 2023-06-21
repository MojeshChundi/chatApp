const bcrypt = require("bcrypt");
const User = require("../models/signup");
const jwt = require("jsonwebtoken");

function generateJwtToken(id) {
  const token = jwt.sign({ id: id }, process.env.JWT_KEY);
  return token;
}

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
      bcrypt.compare(password, user[0].password, async function (err, result) {
        try {
          if (err) {
            console.log("bcrypt error!");
          }
          if (result === false) {
            res.status(401).json({ message: "wrong password!" });
          }
          if (result === true) {
            await User.update({ isLogin: true }, { where: { id: user[0].id } });
            res.status(201).json({
              message: "success",
              token: generateJwtToken(user[0].id),
            });
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};
