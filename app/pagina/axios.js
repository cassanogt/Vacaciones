//*const axios = require("axios");
//const dataUser = {};
let DataJSON;

var config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "http://localhost:3009/vacaciones/",
  headers: {},
};

let configUpdate = {
  method: "put",
  maxBodyLength: Infinity,
  url: "http://localhost:3009/vacaciones/1",
  headers: {
    "Content-Type": "application/json",
  },
  data: DataJSON,
};

// axios(config)
//   .then(function (response) {
//     let dataUser = response.data.data;
//     let tablaUsuarios = document.querySelector("#tabla-usuarios tbody");
//     for (const itemdata of dataUser) {
//       let tr =
//         "<tr> <td>" +
//         itemdata.codigo_usuario +
//         "</td> <td>" +
//         itemdata.nombre_usuario +
//         "</td> <td>" +
//         itemdata.departamento_usuario +
//         "</td> <td>" +
//         itemdata.dias_vacaciones +
//         "</td> <td>" +
//         itemdata.dias_pendientes_vacaciones +
//         "</td> </tr>";
//       tablaUsuarios.innerHTML += tr;
//     }

//console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });

//console.log(dataUser);

// $(async function () {
//   const response = await axios.get("http://localhost:3009/vacaciones/");
//   const data = response.data;
//   console.log[JSON.stringify(data.data)];
//   let data_user = data.data;

//   let autocompleteValues = [];

//   $.each(data_user, function (i, item) {
//     item.codigo_usuario.data;
//     if (item.codigo_usuario === 1) {
//       autocompleteValues.push(item.codigo_usuario + "-" + item.nombre_usuario);
//       console.log(item);
//     }
//   }),
//     $("#tags").autocomplete({
//       source: autocompleteValues,
//     });
// });

async function getCodigoUsuario() {
  const response = await axios.get("http://localhost:3009/vacaciones/");
  const data = response.data;
  console.log(data.data);
  let data_user = data.data;
  let tablaUsuarios = document.querySelector("#tabla-usuarios tbody");

  let obtener = $("#tags").val();
  console.log(obtener);

  let autocompleteValues = [];

  $.each(data_user, function (i, item) {
    //item.codigo_usuario.data;
    if (item.codigo_usuario == obtener) {
      DataJSON =
        item.codigo_usuario +
        "_" +
        item.nombre_usuario +
        "_" +
        item.departamento_usuario +
        "_" +
        item.dias_vacaciones +
        "_" +
        item.dias_pendientes_vacaciones;
      console.log(DataJSON);
      // autocompleteValues.push(item.codigo_usuario + "-" + item.nombre_usuario);
      console.log(item.codigo_usuario);
      console.log(item.nombre_usuario);
      let tr =
        "<tr> <td>" +
        item.codigo_usuario +
        "</td> <td>" +
        item.nombre_usuario +
        "</td> <td>" +
        item.departamento_usuario +
        // "</td> <td>" +
        // item.dias_vacaciones +
        "</td> <td>" +
        item.dias_pendientes_vacaciones +
        "</td> <td> <button class='btn btn-info slv' onclick='getDias(this.id)' id='id_" +
        DataJSON +
        "' data-bs-toggle='modal' data-bs-target='#exampleModal'>Solicitar</button></td> </tr>";
      tablaUsuarios.innerHTML += tr;
      //$("#table").text(item.codigo_usuario + " " + item.nombre_usuario);
      console.log(item);
    }
  }),
    $("#tags").autocomplete({
      source: autocompleteValues,
    });
}

//
function getDias(event) {
  let idUsuario = event.split("_")[1];
  let vacaciones = event.split("_")[5];
  $("#diasPendientes").html("Tus dias pendientes son: " + vacaciones);
  $("#inputDiasPendientes").val(vacaciones);
  console.log(vacaciones);
  return vacaciones;
  console.log(event);
}

function getDiasSolicitados() {
  //let diasDisponibles = getDias(this);
  let diasSolicitados = $("#dias_solicitados").val();
  let diasDisponibles = $("#inputDiasPendientes").val();
  console.log(diasSolicitados);
  console.log("dias disponibles: ", diasDisponibles);

  if (parseInt(diasSolicitados) > parseInt(diasDisponibles)) {
    alert("No tienes tantos dias de vacaciones");
  } else {
    let diferencia = diasDisponibles - diasSolicitados;
    if (diferencia < 0) {
    } else if (diferencia == 0) {
      alert("No te quedaron dias disponibles para vacaciones");
    } else {
      alert("Te quedaran: " + diferencia + " dias de vacaciones");
    }
    return diferencia;
  }
}

function updateVacacionesPendientes() {
  axios(configUpdate)
    .then(function (response) {
      console.log(JSON.stringify(response.DataJSON));
    })
    .catch(function (error) {
      console.log(error);
    });
}

//updateVacacionesPendientes();
