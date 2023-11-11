const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const User = sequelize.define('User',{
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull:false,
    },
    updatedAt:{
        type: DataTypes.DATE,
        allowNull:false,
    }
});

module.exports = User