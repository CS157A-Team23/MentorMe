const Sequelize = require("sequelize");
const config = require("config");
const database = new Sequelize(
  "cs157a",
  config.get("mysqluser"),
  config.get("mysqlpass"),
  {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false,
      freezeTableName: true,
      underscored: true
    }
  }
);

module.exports = database;
