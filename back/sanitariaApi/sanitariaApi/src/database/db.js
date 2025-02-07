const Sequelize = require("sequelize");

const sequelize = new Sequelize("sanitariaribera", "root", "", {
    host: "localhost",
    dialect: "mysql",
  });

module.exports = sequelize;