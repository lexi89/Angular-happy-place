(function(){

angular
.module("questions")
.directive("questionForm", function(){
  return{
    templateUrl: "questions/question.form.html",
    replace: false,
    restrict: "E",
    scope: "=",
    compile: function(element, attributes){
      return{
        post: function(scope, elem, attrs){
          var inputField = elem[0].children[0][0];
          var questionWrapper = elem.parent().parent();

          if (scope.question.id){
            questionWrapper.on("click", function(){
              inputField.focus();
              if (!scope.focusMode){
                scope.$apply(function(){
                  scope.toggleFocusMode();
                });
              }
            });
          }
        }
      };
    },
    controller: ["$scope", "questions.service", function($scope, qs){
      $scope.focusMode = false;
      $scope.solveQuestion = solveQuestion;

      $scope.$watch(function () {return $scope.focusMode;}, function(){
        if ($scope.focusMode) {
          // in focusmode, clicks one the modal should toggle focusmode.
          window.addEventListener("click", function(){
            if (event.target.className == "modal"){
              $scope.$apply(function(){
                $scope.toggleFocusMode();
              });
            }
          });
        }
      });

      $scope.toggleEditMode = function(){
        $scope.editMode= !$scope.editMode;
      };

      $scope.setCaret = function(){
        console.log("set the caret");
      };

      $scope.toggleFocusMode = function(){
        $scope.toggleModal();
        $scope.focusMode = !$scope.focusMode;
      };

      function solveQuestion(){
        $scope.question.answer =
          qs.solveQuestion($scope.question.question);
        $scope.$digest();
      }
    }]
  };
});

})();
