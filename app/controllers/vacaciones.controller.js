const Vacaciones = require("./../models/vacaciones.model.js");

exports.vacacionesByCodigo = (req, res) => {
  const codigo_usuario = req.params.codigo_usuario;

  Vacaciones.vacacionesByCodigo(codigo_usuario, (err, data) => {
    if (err) {
      res.status(500).send({
        success: 0,
        message: err || "Ha ocurrido un error.",
      });
    } else {
      res.status(200).send({
        success: 1,
        data: data,
      });
    }
  });
};

exports.vacacionesAll = (req, res) => {
  Vacaciones.vacacionesAll((err, data) => {
    if (err) {
      res.status(500).send({
        success: 0,
        message: err || "Ha ocurrido un error.",
      });
    } else {
      res.status(200).send({
        success: 1,
        data: data,
      });
    }
  });
};

exports.vacacionesNew = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({
      success: 0,
      message: "El contenido del body no puede estar vacio",
    });
    return;
  }

  const body = new Vacaciones({
    nombre_usuario: req.body.nombre_usuario,
    departamento_usuario: req.body.departamento_usuario,
    dias_vacaciones: req.body.dias_vacaciones,
    dias_pendientes_vacaciones: req.body.dias_pendientes_vacaciones,
  });
  Vacaciones.vacacionesNew(body, (err, data) => {
    if (err) {
      res.status(500).send({
        success: 0,
        message: err || "Ha ocurrido un error.",
      });
    } else {
      res /
        res.status(200).send({
          success: 1,
          data: data,
        });
    }
  });
};

exports.vacacionesUpdate = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({
      success: 0,
      message: "El contenido del body no puede estar vacio.",
    });
    return;
  }

  const codigo_usuario = req.params.codigo_usuario;
  Vacaciones.vacacionesUpdate(
    codigo_usuario,
    new Vacaciones(req.body),
    (err, data) => {
      if (err) {
        if (err.resolved === "not_found") {
          res.status(400).send({
            success: 0,
            message: `No se encontró algun cliente con el id ${id}`,
          });
        } else {
          res.status(500).send({
            succes: 0,
            message: err || `Error al actualizar el cliente con el id ${id}`,
          });
        }
      } else {
        res.status(200).send({
          success: 1,
          data: data,
        });
      }
    }
  );
};

exports.vacacionesDelete = (req, res) => {
  const codigo_usuario = req.params.codigo_usuario;
  Vacaciones.vacacionesDelete(codigo_usuario, (err, data) => {
    if (err) {
      res.status(500).send({
        success: 0,
        message: err || `No se pudo eliminar el cliente con el id ${id}`,
      });
    } else {
      res.status(200).send({
        success: 1,
        data:
          data ||
          `Se eliminó correctamente el cliente con el codigo ${codigo_usuario}`,
      });
    }
  });
};
