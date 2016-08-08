var Q = require("q");
var sessions = require("client-sessions");
var _ = require("underscore");


module.exports = function(app){


  // start of API
  app.get("/questions", function(req,res){
    // get questions out of the cookie
    var questions = req.session.questions;
    if (!questions || questions === undefined){
      res.status(404).send("No questions found...");
    }
    res.status(200).send(questions);
  });

  app.post("/newquestion", function(req, res){
    req.session.questions.push({
      id: Date.now(), // use the time of creation as ID
      question: req.body.question,
      answer: req.body.answer
    });
    res.status(200).send(req.session.questions);
  });

  app.post("/question", function(req, res){
    // find the question
    var index = req.session.questions.findIndex(function(elem){
      return elem.id === req.body.question.id;
    });
    if (index === -1){
      res.status(404).send("Couldn't update the question...");
    }
    // update the question.
    req.session.questions[index] = {
      "id": req.body.question.id,
      "question": req.body.question.question,
      "answer": req.body.question.answer
    };
    res.status(200).send(req.session.questions);
  });

  app.delete("/question", function(req, res){
    // find and delete the passed question from the cookie
    var index = req.session.questions.findIndex(function(element){
      return element.id === req.body.question.id;
    });

    if (index === -1){
      res.status(404).send("couldn't find the question...");
    } else {
      var newQuestions = _.reject(req.session.questions, function(elem){
        return elem.id === req.body.question.id;
      });
      req.session.questions = newQuestions;
      res.status(200).send(newQuestions);
    }
  });

  app.get("/clearquestions", function (req, res) {
    // clear the questions from the session.
    req.session.questions = [];
    res.status(200).send("questions deleted");
  });

};
