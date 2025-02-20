const sequelize = require("../db");

const { Model, DataTypes } = require("sequelize");

class Muestra extends Model {}

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
    },
    id_cassette:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "cassette",
            key: "id_cassette"
        },
        onDelete: "CASCADE"
    }
},{
    sequelize,
    modelName: "muestra",
    tableName: "muestra",
    timestamps: false
})

module.exports = Muestra;