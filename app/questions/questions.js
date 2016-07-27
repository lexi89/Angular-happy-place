
  angular
    .module("questions",["ngRoute"])
    .controller("questionsCtrl", QuestionsController)
    .config(config);

    QuestionsController.$inject = ["questions.service", "$scope"];

    function QuestionsController(questionservice, $scope){
      var _ = $scope;
      var qs = questionservice;

      _.newQuestion = {"question":"", "answer":""};
      _.questionsArray = [
        {
          "_id": "875643",
          "question":"1+2",
          "answer":"3"
        },
        {
          "_id": "213456",
          "question": "3+4",
          "answer": "7"
        }];
      _.saveQuestion = saveQuestion;
      _.fetchQuestions = fetchQuestions;
      _.logScope = logScope;

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

      function fetchQuestions(){
        console.log("gonna fetch some q's");
        // qs.fetchQuestions()
        // .then(function(data){
        //   _.questionsArray = data;
        // })
        // .catch(function(error){
        //   console.log(error);
        // });
      }

      function logScope(){
        console.log($scope);
      }


    }

    function config($routeProvider){
      $routeProvider.when("/",{
        templateUrl: "/questions/questions.view.html",
        controller: "questionsCtrl",
        controllerAs: "questions"
      });
    }
