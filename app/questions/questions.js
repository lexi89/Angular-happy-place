(function(){

  angular
    .module("questions",["ngRoute"])
    .controller("questionsCtrl", QuestionsController)
    .config(config);

    QuestionsController.$inject = ["questions.service"];

    function QuestionsController(questionservice){
      this.newQuestion = {};
    }

    function config($routeProvider){
      $routeProvider.when("/",{
        templateUrl: "/questions/questions.view.html",
        controller: "questionsCtrl",
        controllerAs: "questions"
      });
    }
})();
