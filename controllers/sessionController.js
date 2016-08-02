var Users = require("../models/userModel.js");
var bodyParser = require("body-parser");


module.exports = function(app, passport){

  app.post("/register", function(req, res){
    var newUser = Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    newUser.save()
    .then(function(success){
      res.send(success);
    })
    .catch(function(err){
      res.status(500);
      res.send(err);
    });
  });
};
