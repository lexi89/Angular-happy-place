angular
.module("questions")
.directive("questionForm", function(){
  return{
    templateUrl: "/questions/question.form.html",

    controller: ["$scope", "questions.service", function($scope, questionservice){
      var qs = questionservice;

      // watch for question changes
      $scope.$watch("question.question",
      function(){
        var thisQuestion = $scope.question;
        // if the last character is a number, solve the question & update the answer
        if (!isNaN(thisQuestion.question.slice(-1))){
          thisQuestion.answer = qs.solveQuestion(thisQuestion.question);
        }
      });
    }]
  };
});
