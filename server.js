var express = require("express");
var app = express();
var sessions = require("client-sessions");
var bodyParser = require("body-parser");

var port = process.env.PORT || 5000;

// Express settings
app.set("views", "./app");
app.set("view engine", "ejs");
app.use("/", express.static(__dirname +"/app"));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.listen(port, function(){
  console.log("Node server is running on port:" + port);
});
