angular
.module("questions")
.directive("questionForm", function(){
  return{
    templateUrl: "/questions/question.form.html",
    replace: false,
    restrict: "E",
    scope: "=",
    compile: function(element, attributes){
      return{
        post: function(scope, elem, attrs){
          if (scope.question.id){
            var questionWrapper = elem.parent().parent();
            questionWrapper.on("click", function(){
              elem.children().children().find("input").focus();
              if (!scope.focusMode){
                // set body background-color to modal;
                scope.$apply(function(){
                  scope.toggleFocusMode();
                });
              }
            });
          }
        }
      };
    },
    controller: ["$scope", "questions.service", function($scope, questionservice){
      var qs = questionservice;
      $scope.focusMode = false;

      $scope.toggleFocusMode = function(){
        $scope.toggleModal();
        $scope.focusMode = !$scope.focusMode;
      };

      $scope.$watch(function () {return $scope.focusMode;}, function(){
        if ($scope.focusMode) {
          // listen for clicks on modal in focusmode
          window.addEventListener("click", function(){
            if (event.target.className == "modal"){
              $scope.$apply(function(){
                $scope.toggleFocusMode();
              });
            }
          });
        }
      });

      // watch for question changes
      $scope.$watch("question.question",
      function(){
        var thisQuestion = $scope.question;
        // if the last character is a number, solve the question & update the answer
        if (!isNaN(thisQuestion.question.slice(-1))){
          thisQuestion.answer = qs.solveQuestion(thisQuestion.question);
        }
      });

      $scope.toggleEditMode = function(){
        $scope.editMode = !$scope.editMode;
      };

    }]
  };
});
