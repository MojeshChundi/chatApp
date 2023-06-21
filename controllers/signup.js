const bcrypt = require("bcrypt");
const User = require("../models/signup");
const Message = require("../models/chat");

exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
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

exports.getusers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ["name"] });
    const messages = await Message.findAll({ attributes: ["content"] });
    res.status(201).json({ users: users, messages: messages });
  } catch (err) {
    console.log(err);
  }
};
