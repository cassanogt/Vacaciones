const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();
const https = require("https");
const http = require("http");

//local
const configuration = require("./app/config/environment/configuration.js");
console.log("configuration: ", configuration);

// cors
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Web Api Offimarket Actualizado." });
});

/** NEW ROUTER */
require("./app/routes/vacaciones.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3009;
//local
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
