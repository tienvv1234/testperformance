"use strict";

// Modules:
var AcuityScheduling = require("acuityscheduling");
var express = require("express");

// Create an instance of Acuity for accessing the API:
var acuity = AcuityScheduling.basic({
//   userId: '22213006',
//   apiKey: '854dc314c1e2c9b7feb596f8771989d1',
  userId: "16696944",
  apiKey: "36fa76dda4beb013aa48228da563f53f",
});

// Create a new express server:
var app = express();
var port = process.env.ACUITY_PORT || 3000;

// Add some routes:
app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/api/classes", function (req, res) {
  // Request classes from the Acuity API:
  console.log('req.query.month', req.query.month)
  acuity.request(
    "/availability/classes?month=" + req.query.month,
    function (err, response) {
      if (err) {
        return console.error(err);
      }
      res.send(response.body);
    }
  );
});

// Listen on the selected port:
app.listen(port, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log("Server started! Say hey at http://localhost:" + port + "/");
});
