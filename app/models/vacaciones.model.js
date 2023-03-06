const sql = require("./db.js");
const util = require("util");

const Vacaciones = function (vacaciones) {
  this.codigo_usuario = vacaciones.codigo_usuario;
  this.nombre_usuario = vacaciones.nombre_usuario;
  this.departamento_usuario = vacaciones.departamento_usuario;
  this.dias_vacaciones = vacaciones.dias_vacaciones;
  this.dias_pendientes_vacaciones = vacaciones.dias_pendientes_vacaciones;
};

Vacaciones.vacacionesByCodigo = (codigo_usuario, result) => {
  let SQL = `SELECT codigo_usuario, nombre_usuario, departamento_usuario, dias_vacaciones, dias_pendientes_vacaciones FROM usuario WHERE codigo_usuario = ${codigo_usuario}`;

  sql.query(SQL, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ resolved: "not_found" }, null);
  });
};

Vacaciones.vacacionesAll = (result) => {
  let SQL = `SELECT codigo_usuario, nombre_usuario, departamento_usuario, dias_vacaciones, dias_pendientes_vacaciones FROM usuario;`;
  sql.query(SQL, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res);
      return;
    }

    result({ resolved: "not_found" }, null);
  });
};
Vacaciones.vacacionesNew = (body, result) => {
  let SQL = ``;
  SQL = `INSERT INTO usuario (nombre_usuario, departamento_usuario, dias_vacaciones, dias_pendientes_vacaciones) VALUES ('${body.nombre_usuario}', '${body.departamento_usuario}', ${body.dias_vacaciones}, ${body.dias_pendientes_vacaciones})`;

  sql.query(SQL, (err, res) => {
    if (err) {
      result(err, null);
      return;
    } else {
      body.id = res.insertId;
      result(null, {
        ...body,
      });
    }
  });
};

Vacaciones.vacacionesUpdate = (codigo_usuario, body, result) => {
  let SQL = ``;
  SQL = `UPDATE usuario 
  SET nombre_usuario = '${body.nombre_usuario}', 
  departamento_usuario = '${body.departamento_usuario}', 
  dias_vacaciones = ${body.dias_vacaciones}, 
  dias_pendientes_vacaciones = ${body.dias_pendientes_vacaciones}
  WHERE codigo_usuario=${codigo_usuario}`;

  sql.query(SQL, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ resolved: "not_found" }, null);
      return;
    }

    body.codigo_usuario = codigo_usuario;
    result(null, { ...body });
  });
};
Vacaciones.vacacionesDelete = (codigo_usuario, result) => {
  let SQL = ``;
  SQL = `DELETE FROM usuario WHERE Codigo_Usuario = ${codigo_usuario}`;

  sql.query(SQL, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Vacaciones;
