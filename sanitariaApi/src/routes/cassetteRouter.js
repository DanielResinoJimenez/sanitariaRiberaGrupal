const cassetteRouter = require("express").Router();
const cassette = require("./../controllers/cassetteController");

cassetteRouter.get("/all", cassette.getAllCassettes);
cassetteRouter.get("/orderbydate/", cassette.getPorFecha);
cassetteRouter.get("/orderbyorganos/", cassette.getPorOrgano);
cassetteRouter.get("/orderbydescripcion/", cassette.getPorDescripcion);
cassetteRouter.get("/:id", cassette.getUnCassette);
cassetteRouter.get("/organos", cassette.onlyOrganos);
cassetteRouter.post("/create", cassette.createCassette);
cassetteRouter.put("/modify/:id", cassette.updateCassette);
cassetteRouter.delete("/delete/:id", cassette.deleteCassette);

module.exports = cassetteRouter;