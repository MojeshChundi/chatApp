const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const chatRoutes = require("./routes/chat");
const sequelize = require("./util/database");
const User = require("./models/signup");
const Message = require("./models/chat");

app.use(bodyParser.json());
app.use(cors());
//routes
app.use(signupRoutes);
app.use(loginRoutes);
app.use(chatRoutes);
app.use((req, res) => {
  res.sendFile(path.join(__dirname, `${req.url}`));
  console.log(req.url);
});
//relations
User.hasMany(Message);
Message.belongsTo(User);
//server
sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT || 3000);
    console.log(`port ${process.env.PORT} is running ...!`);
  })
  .catch((err) => {
    console.log(err);
  });
