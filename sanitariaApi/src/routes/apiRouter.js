const apirouter = require("express").Router();
// const { checkToken } = require("./middlewares");

// Variables
const userRouter = require("./userRouter");
// const clientesrouter = require("./clienteRouter");
// const vehiculosrouter = require("./vehiculoRouter");
// const fabricantesrouter = require("./fabricanteRouter");
// const comprasrouter = require("./compraRouter");


// Rutas
apirouter.use("/usuarios", userRouter);

// apirouter.use("/clientes", clientesrouter);
// apirouter.use("/clientes",checkToken, clientesrouter)
// apirouter.use("/vehiculos", vehiculosrouter);
// apirouter.use("/vehiculos",checkToken, vehiculosrouter)
// apirouter.use("/fabricantes", fabricantesrouter);
// apirouter.use("/fabricantes",checkToken, fabricantesrouter)
// apirouter.use("/compras", comprasrouter);


module.exports = apirouter;