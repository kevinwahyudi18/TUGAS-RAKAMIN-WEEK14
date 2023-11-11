const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect:"postgres",
    username:"postgres",
    password: "181217",
    host: "localhost",
    port: 5432,
    database:"homework_akhir"
});

module.exports = sequelize