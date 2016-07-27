var Questions = require("../models/questionModel");
var bodyParser = require("body-parser");
var Q = require("q");

module.exports = function(app){

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));


  // start of API
  app.get("/questions", function(req,res){
    Questions.find({homeworkId: "test"})
    .then(function(response){
      res.send(response);
    });
  });

  app.post("/question", function(req, res){
    // find by id and update with new params
    Questions.findOneAndUpdate(
      {_id: req.body._id},
      {
        question: req.body.question,
        answer: req.body.answer
      }
    ).then(function(response){
      res.send(response);
    })
    .catch(function(err){
      res.send("something went wrong:" + err);
    });
  });

  app.post("/newquestion", function(req, res){
    // create a new question
    var newQuestion = Questions({
      homeworkId: "test",
      question: req.body.question,
      answer: req.body.answer
    });

    newQuestion.save()
    .then(function(response){
      res.send("Success! Here's the response: " + response);
    })
    .catch(function(err){
      res.send("Something went wrong: " + err );
    })
    .done(function(){
      console.log("done");
    });

  });
};
