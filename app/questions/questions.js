
  angular
    .module("questions",["ngRoute"])
    .controller("questionsCtrl", QuestionsController)
    .config(config);

    QuestionsController.$inject = ["questions.service", "$scope"];

    function QuestionsController(questionservice, $scope){
      var _ = $scope;
      var qs = questionservice;

      _.newQuestion = "";
      _.typing = false;
      _.newAnswer = "";
      _.questionsArray = [];
      _.saveQuestion = saveQuestion;
      _.fetchQuestions = fetchQuestions;

      _.$watch("newQuestion", function(){
        if (!isNaN(_.newQuestion.slice(-1))){
          // if the last entry is a number, solve the question.
          _.newAnswer = qs.solveQuestion(_.newQuestion);
        }
      });

      function saveQuestion(){
        qs.saveQuestion(_.newQuestion,_.newAnswer);
        _.$apply(function(){
          _.questionsArray.push({
            question: _.newQuestion,
            answer: _.newAnswer
          });
          _.newQuestion = "";
          fetchQuestions();
        });
      }

      function fetchQuestions(){
        qs.fetchQuestions()
        .then(function(data){
          _.questionsArray = data;
        })
        .catch(function(error){
          console.log(error);
        });
      }

      function updateQuestion(){
        // post a question update to the database.
      }
    }

    function config($routeProvider){
      $routeProvider.when("/",{
        templateUrl: "/questions/questions.view.html",
        controller: "questionsCtrl",
        controllerAs: "questions"
      });
    }
