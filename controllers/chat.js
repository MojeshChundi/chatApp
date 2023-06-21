const Message = require("../models/chat");
const User = require("../models/signup");

exports.chat = async (req, res, next) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;
    const messages = await Message.create({ content: message, userId: userId });
    res.status(200).json({ messages });
  } catch (err) {
    console.log(err);
  }
};

exports.getusers = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const users = await User.findAll({
      where: { isLogin: true },
      attributes: ["name"],
    });
    const name = await User.findAll({
      where: { id: userId },
      attributes: ["name"],
    });
    const messages = await Message.findAll({
      where: { userId: userId },
      attributes: ["content"],
    });
    res.status(201).json({ users: users, messages: messages, name: name });
  } catch (err) {
    console.log(err);
  }
};
