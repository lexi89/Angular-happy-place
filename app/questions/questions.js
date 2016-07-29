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
      _.savedQuestions = [];
      _.saveQuestion = saveQuestion;
      _.fetchQuestions = fetchQuestions;
      _.resetQuestion = resetQuestion;
      _.deleteQuestion = deleteQuestion;

      fetchQuestions();

      function saveQuestion(){
        if (!this.question._id){
          qs.saveQuestion(this.question);
          resetQuestion();
          fetchQuestions();
        } else {
          _.savedQuestions.push(this.question); // immediate feedback for user
          qs.updateQuestion(this.question);
          fetchQuestions();
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
        console.log("Deleting question...");
        _.savedQuestions.splice(this.$index, 1);
        qs.deleteQuestion(this.question)
        .then(function (success) {
          // question saved!
        })
        .catch(function (fail) {
          // question failed to save!
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
