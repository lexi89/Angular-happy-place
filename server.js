USERNAME = "lexi89";
PASSWORD = "hacking1";

var express = require("express");
var app = express();
var apiController = require("./controllers/apiController");
var sessionController = require("./controllers/sessionController");
var port = process.env.PORT || 5000;
var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise; // Change mongoose promise library to 'q'
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var passportConfig = require("./config/passport.js");
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var flash = require("connect-flash");

// Middleware
app.use(express.static("app"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// passport setup
passport.use(new LocalStrategy(
  function(username, password, done){
    User.findOne({username:username}, function(err, user){
      if (err){return done(err);}
      if (!user) {return done(null, false);}
      if (!user.verifyPassword(password)){
        return done(null,user);
      }
      return done(null,user);
    });
  }
));

app.use(session({
  secret: "bloodyhell",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize()); // call initialize on every request
app.use(passport.session()); // restore the session on every request
app.use(flash());


app.get("/", function (req, res) {
  res.render("index");
});

// connect to mongo
mongoose.connect("mongodb://" + USERNAME + ":" + PASSWORD + "@ds029675.mlab.com:29675/questions");
var db = mongoose.connection;

// setup APIs
apiController(app);
sessionController(app);


app.listen(port, function(){
  console.log("Node server is running on port:" + port);
});
