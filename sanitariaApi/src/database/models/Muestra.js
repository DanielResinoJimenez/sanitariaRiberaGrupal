const sequelize = require("../db");

const { Model, DataTypes } = require("sequelize");

class User extends Model {}

Model.init({
    id_muestra: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    fecha_muestra: {
        type: DataTypes.DATE,
        allowNull: false,

    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tincion: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    sequelize,
    modelName: "tincion",
    timestamps: false
})