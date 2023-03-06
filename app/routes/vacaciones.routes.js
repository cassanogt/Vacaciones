module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const vacaciones = require("./../controllers/vacaciones.controller.js");

  /** ENDPOINTS WITH ROUTER */

  router.get("/vacaciones/:codigo_usuario", vacaciones.vacacionesByCodigo);
  router.get("/vacaciones", vacaciones.vacacionesAll);
  router.post("/vacaciones/:codigo_usuario", vacaciones.vacacionesNew);
  router.put("/vacaciones/:codigo_usuario", vacaciones.vacacionesUpdate);
  router.delete("/vacaciones/:codigo_usuario", vacaciones.vacacionesDelete);

  app.use(router);
};
