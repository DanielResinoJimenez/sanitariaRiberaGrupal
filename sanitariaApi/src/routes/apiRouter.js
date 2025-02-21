const apirouter = require("express").Router();
const middleware = require("./middleware");

// Variables
const userRouter = require("./userRouter");
const cassetteRouter = require("./cassetteRouter");
const muestraRouter = require("./muestraRouter");
const imagenRouter = require("./imagenRouter");


// Rutas
apirouter.use("/usuarios", userRouter);
apirouter.use("/cassettes", middleware.checkToken, cassetteRouter);
apirouter.use("/muestras", middleware.checkToken, muestraRouter);
apirouter.use("/imagenes", middleware.checkToken, imagenRouter);


module.exports = apirouter;