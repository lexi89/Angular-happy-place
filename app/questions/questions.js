(function(){
  angular
    .module("questions",["ngRoute"])
    .controller("questionsCtrl", QuestionsController)
    .config(config);

    QuestionsController.$inject = ["questions.service", "$scope", "flashService"];

    function QuestionsController(questionservice, $scope, flash){
      var _ = $scope;
      var qs = questionservice;

      _.question = {"question":"", "answer":""};
      _.savedQuestions = [];
      _.saveQuestion = saveQuestion;
      _.fetchQuestions = fetchQuestions;
      _.resetQuestion = resetQuestion;
      _.deleteQuestion = deleteQuestion;

      fetchQuestions();

      function saveQuestion(){
        if (!this.question._id){
          qs.saveQuestion(this.question)
          .then(function(){
            fetchQuestions();
          });
          _.savedQuestions.push(this.question); flash.message("success", "Question saved");
          resetQuestion();
        } else {
          qs.updateQuestion(this.question)
          .then(function(){
            fetchQuestions();
          });
        }
      }

      function fetchQuestions(){
        qs.fetchQuestions()
        .then(function(data){
          _.savedQuestions = data;
        })
        .catch(function(error){
          console.log(error);
        });
      }

      function deleteQuestion(){
        _.savedQuestions.splice(this.$index, 1);
        qs.deleteQuestion(this.question)
        .then(function (success) {
          flash.message("success", "Question deleted");
        })
        .catch(function (fail) {
          flash.message("alert", "Couldn't delete your question...");
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
