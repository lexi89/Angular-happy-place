(function(){

  angular
    .module("questions",["ngRoute"])
    .controller("questionsCtrl", QuestionsController)
    .config(config);

    QuestionsController.$inject = ["questions.service", "$scope", "flashService"];

    function QuestionsController(qs, $scope, flash){
      var _ = $scope;

      _.question = {
        "question":"",
        "math": "",
        "answer": ""
      };

      _.savedQuestions = [];
      _.saveQuestion = saveQuestion;
      _.fetchQuestions = fetchQuestions;
      _.resetQuestion = resetQuestion;
      _.deleteQuestion = deleteQuestion;
      _.clearQuestions = clearQuestions;

      fetchQuestions(); // Start by fetching questions from cookies.

      function fetchQuestions(){
        qs.fetchQuestions()
        .then(function (questions) {
          _.savedQuestions = questions;
        }, function (error) {
          flash.message("alert", error);
        });
      }

      function saveQuestion(){
        if (!this.question.id){
          // save new question
          qs.saveQuestion(_.question)
          .then(function (questions) {
            resetQuestion();
            flash.message("success", "Question saved!");
            _.savedQuestions = questions;
          }, function (err) {
            flash.message("alert", err);
          });
        } else {
          // update existing question.
          this.toggleFocusMode();
          qs.updateQuestion(this.question)
          .then(function (questions) {
            _.savedQuestions = questions;
            flash.message("success", "Question saved!");
          }, function (error) {
            flash.message("alert", "Couldn't save your question...");
          });
        }
      }

      function deleteQuestion($event){
        $event.stopPropagation();
        qs.deleteQuestion(this.question)
        .then(function (questions) {
          flash.message("success", "Question deleted");
          _.savedQuestions = questions;
        }, function (error) {
          flash.message("alert", "Couldn't save the question...");
        });
      }

      function resetQuestion(){
        _.question = {"question":"", "answer":""};
      }

      function clearQuestions(){
        qs.clearQuestions()
        .then(function (success) {
          flash.create("success", "Cookie reset");
        }, function (err) {
          flash.create("alert", "Couldn't reset cookie...");
        });
      }
    }

    function config($routeProvider){
      $routeProvider.when("/",{
        templateUrl: "questions/questions.view.html",
        controller: "questionsCtrl",
        controllerAs: "questions"
      });
    }

})();
