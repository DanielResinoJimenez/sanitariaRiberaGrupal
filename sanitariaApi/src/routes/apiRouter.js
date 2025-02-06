const apirouter = require("express").Router();
// const { checkToken } = require("./middlewares");

const clientesrouter = require("./clienteRouter");
const vehiculosrouter = require("./vehiculoRouter");
const fabricantesrouter = require("./fabricanteRouter");
const comprasrouter = require("./compraRouter");
const userrouter = require("./userRouter");

// apirouter.use("/clientes", clientesrouter);
// apirouter.use("/clientes",checkToken, clientesrouter)
// apirouter.use("/vehiculos", vehiculosrouter);
// apirouter.use("/vehiculos",checkToken, vehiculosrouter)
// apirouter.use("/fabricantes", fabricantesrouter);
// apirouter.use("/fabricantes",checkToken, fabricantesrouter)
// apirouter.use("/compras", comprasrouter);
apirouter.use("/users", userrouter);

module.exports = apirouter;