const bcrypt = require("bcrypt");
const User = require("../models/signup");

exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    console.log(name, email, password, phone);

    const existedEmail = await User.findAll({ where: { email: email } });
    if (existedEmail.length !== 0) {
      res.status(200).json({ existedEmail: existedEmail[0].email });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        const data = {
          name: name,
          email: email,
          password: hash,
          number: phone,
        };
        User.create(data);
        res.status(201).json({ data: data });
      });
    }
  } catch (err) {
    console.log(err);
  }
};
