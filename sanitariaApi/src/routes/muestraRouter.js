const muestraRouter = require("express").Router();
const muestra = require("./../controllers/muestraController");

muestraRouter.get("/all", muestra.getMuestras);
muestraRouter.get("/:id", muestra.getUnMuestra);
muestraRouter.post("/create", muestra.createMuestra);
muestraRouter.put("/modify/:id", muestra.put);
muestraRouter.delete("/delete/:id", muestra.remove);

module.exports = muestraRouter;