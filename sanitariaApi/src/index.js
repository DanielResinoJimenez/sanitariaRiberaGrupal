// Inicializamos todas las variales
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// Concectamos con la base de datos
const sequelize = require("./database/db");

// Conversión a json

// Configuramos rutas
const apiroutes = require("./routes/apiRouter");