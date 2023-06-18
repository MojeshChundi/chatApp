const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const signupRoutes = require("./routes/signup");
const sequelize = require("./util/database");

app.use(bodyParser.json());
app.use(cors());
//routes
app.use(signupRoutes);
app.use((req, res) => {
  res.sendFile(path.join(__dirname, `${req.url}`));
});

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
