const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const Book = sequelize.define('Book',{
    title:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    author:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    publisher:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    year:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    page:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    image:{
        type: DataTypes.TEXT,
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

module.exports = Book