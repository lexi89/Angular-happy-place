var express = require("express");
var app = express();
var apiController = require("./controllers/apiController");
var sessions = require("client-sessions");
var bodyParser = require("body-parser");

var port = process.env.PORT || 5000;

// Express settings
app.set("views", "./app");
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/app"));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(sessions({
  cookieName: "session",
  secret: "iminyourcookies",
  duration: 24*60*60*1000,
  activeDuration: 1000 * 60 * 5
}));

app.use(function(req, res, next){
  if (!req.session.questions){
    req.session.questions = [];
  }
  next();
});

app.get("/dashboard", function(req, res){
  res.render("dashboard/dashboard.ejs");
});

app.get("/", function (req, res) {
  res.render("homepage.ejs");
});

// setup APIs
apiController(app);
// sessionController(app);


app.listen(port, function(){
  console.log("Node server is running on port:" + port);
});
