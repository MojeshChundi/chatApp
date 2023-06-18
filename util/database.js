const Sequelize = require("sequelize");
const sequelize = new Sequelize("chatapp", "root", "Bujji@123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
