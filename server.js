var secrets = require("./config/secrets.js");
var express = require("express");
var app = express();
var apiController = require("./controllers/apiController");
var sessionController = require("./controllers/sessionController");
var port = process.env.PORT || 5000;
var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise; // Change mongoose promise library to 'q'
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var flash = require("connect-flash");
var Users = require("./models/userModel.js");

// Express settings
app.set("views", "./app");
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/app"));

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// passport strategies setup
passport.use(new LocalStrategy(
  function(username, password, done){
    Users.findOne({email: username}, function(err, user){
      if (err){
        return done(err);
      }
      if (!user) {
        return done(null,false);
      }
      return done(null, user);
    });
  }
));

app.get("/dashboard", function(req, res){
  res.render("dashboard.ejs");
});


app.get("/", function (req, res) {
  res.render("index");
});


// connect to mongo
mongoose.connect("mongodb://" + secrets.mongo.USERNAME + ":" + secrets.mongo.PASSWORD + "@ds029675.mlab.com:29675/questions");
var db = mongoose.connection;

// setup APIs
apiController(app);
sessionController(app, passport);


app.listen(port, function(){
  console.log("Node server is running on port:" + port);
});
