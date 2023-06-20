const Message = require("../models/chat");

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
