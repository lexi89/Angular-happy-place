
  angular
    .module("questions",["ngRoute"])
    .controller("questionsCtrl", QuestionsController)
    .config(config);

    QuestionsController.$inject = ["questions.service", "$scope"];

    function QuestionsController(questionservice, $scope){
      $scope.newQuestion = "";

      $scope.$watch("newQuestion", function(){
        console.log("The question has changed. Sending for parsing");
        parseQuestion($scope.newQuestion);
      });

      $scope.newAnswer = parseQuestion(this.newQuestion);
      $scope.questions = ["q1", "q2"];
      $scope.saveQuestion = questionservice.saveQuestion;

      function parseQuestion(question){
        $scope.newAnswer = question;
      }
      // Initialise a blank temp JS question.
      // On key-press, check if the character matches allowed characters. Initially, only allow operators and numbers.
      // on keypress, get an answer for the updated question
      // show the answer
    }

    function config($routeProvider){
      $routeProvider.when("/",{
        templateUrl: "/questions/questions.view.html",
        controller: "questionsCtrl",
        controllerAs: "questions"
      });
    }
