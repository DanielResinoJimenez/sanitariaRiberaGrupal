const sequelize = require("../db");

const { Model, DataTypes } = require("sequelize");

class User extends Model {}

Model.init({
    id_user: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre_user:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos_user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email_user: {
        type: DataTypes.STRING,
        unique: true,
    },
    password_user: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    sequelize,
    modelName: "user",
    timestamps: false
})

module.exports = User;