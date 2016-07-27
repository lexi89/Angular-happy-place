angular
.module("questions")
.directive("questionForm", function(){
  return{
    templateUrl: "/questions/question.form.html",
    scope:{
      passedQuestion: "=question",
      passedQuestionsArray: "=questionsArray",
      passedRefresh: "=refresh"
    },
    link: function(scope, elem, attrs){
      var regexp = new RegExp(/(\d|\*|\+|\-|\+)/, "g");

      elem.on("keypress", function(){ // on keypress
        // prevent any non-valid chars from being added to the model.
        if (isValid(event.key) !== 0){
          if (event.which === 13){
            scope.saveQuestion();
            // allow enter key for "submit" event
          }
          event.preventDefault();
          // add some UX feedback here
        }
        function isValid(key){
          return key.search(regexp);
        }
      });
    },
    controller: ["$scope", "questions.service", function($scope, questionservice){
      var qs = questionservice;
      var currentQ = $scope.passedQuestion;
      var qArray = $scope.passedQuestionsArray;

      // if a user enters a number, solve the question and update the answer.
      $scope.$watch("passedQuestion.question", function(){
        if (!isNaN(currentQ.question.slice(-1))){
          currentQ.answer =  qs.solveQuestion(currentQ.question);
        }
      });

      $scope.saveQuestion = function(){
        // if it's a new question, save a new question.
        if (!currentQ._id){
          qs.saveQuestion(currentQ.question, currentQ.answer);
          $scope.passedRefresh();
        }
      };

      // $scope.fetchQuestions = function(){
      //   return qs.fetchQuestions()
      //   .then(function(data){
      //     qArray = data;
      //     console.log(data);
      //   });
      // };

      $scope.pushToArray = function(){
        qArray.push(currentQ);
      };



    }]
  };
});
