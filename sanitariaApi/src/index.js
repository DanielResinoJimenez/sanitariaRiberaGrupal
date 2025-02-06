// Inicializamos todas las variales
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// Concectamos con la base de datos
const sequelize = require("./database/db");

// Importamos las asociaciones para que se generen en nuesta base de datos
require("./database/associations")

// Conversión a json

// Configuramos rutas
const apiroutes = require("./routes/apiRouter");

// Ruta para acceder a la base de datos
app.use("/sanitaria", apiroutes);

// Nos conectamos con el puerto.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor conectado al puerto "+PORT);
    sequelize
    .sync({force: false })
    .then(() => console.log("Sincronizado con la base de datos SanitariaRibera"))
})