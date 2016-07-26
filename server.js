USERNAME = "lexi89";
PASSWORD = "hacking1";

var express = require("express");
var app = express();
var apiController = require("./controllers/apiController");
var port = process.env.PORT || 5000;
var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise; // Change mongoose promise library to 'q'

// Middleware
app.use(express.static("app"));

app.get("/", function (req, res) {
  res.render("index");
});

// connect to mongo
mongoose.connect("mongodb://" + USERNAME + ":" + PASSWORD + "@ds029675.mlab.com:29675/questions");
var db = mongoose.connection;

// setup API
apiController(app);

app.listen(port, function(){
  console.log("Node server is running on port:" + port);
});
