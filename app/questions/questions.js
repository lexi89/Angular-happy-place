
  angular
    .module("questions",["ngRoute"])
    .controller("questionsCtrl", QuestionsController)
    .config(config);

    QuestionsController.$inject = ["questions.service", "$scope"];

    function QuestionsController(questionservice, $scope){
      var _ = $scope;
      var qs = questionservice;

      _.newQuestion = "";
      _.newAnswer = "";
      _.questionsArray = [{"question":"1+2", "answer":"3"}, {"question": "3+4", "answer": "7"}]; //dummy data
      _.saveQuestion = saveQuestion;
      _.fetchQuestions = fetchQuestions;
      _.editQuestion = editQuestion;

      _.$watch("newQuestion", function(){
        if (!isNaN(_.newQuestion.slice(-1))){
          // if the last entry is a number, solve the question.
          _.newAnswer = qs.solveQuestion(_.newQuestion);
        }
      });

      function saveQuestion(){
        qs.saveQuestion(_.newQuestion,_.newAnswer);
        // _.$apply(function(){
        //   _.questionsArray.push({
        //     question: _.newQuestion,
        //     answer: _.newAnswer
        //   });
        _.newQuestion = "";
        fetchQuestions();
      }


      function editQuestion(){
        // this = the scope of the iterated question.
        console.log(this);
        // on click, change the li to a form.
      }

      function updateQuestion(){
        console.log("update the question");
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


    }

    function config($routeProvider){
      $routeProvider.when("/",{
        templateUrl: "/questions/questions.view.html",
        controller: "questionsCtrl",
        controllerAs: "questions"
      });
    }
