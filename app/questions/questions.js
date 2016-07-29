(function(){
  angular
    .module("questions",["ngRoute"])
    .controller("questionsCtrl", QuestionsController)
    .config(config);

    QuestionsController.$inject = ["questions.service", "$scope"];

    function QuestionsController(questionservice, $scope){
      var _ = $scope;
      var qs = questionservice;

      _.question = {"question":"", "answer":""};
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
      _.resetQuestion = resetQuestion;

      function saveQuestion(){
        if (!this.question._id){
          qs.saveQuestion(this.question);
          resetQuestion();
          fetchQuestions();
        } else {
          qs.updateQuestion(this.question);
          fetchQuestions();
        }
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

      function resetQuestion(){
        _.question = {"question":"", "answer":""};
      }

    }

    function config($routeProvider){
      $routeProvider.when("/",{
        templateUrl: "/questions/questions.view.html",
        controller: "questionsCtrl",
        controllerAs: "questions"
      });
    }

})();
