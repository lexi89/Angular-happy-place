angular
  .module("questions")
  .directive("questionsList", function(){
    return{
      scope: "=",
      controller: function($scope){
        $scope.updateQuestion = function(){
          console.log(this.question);
        };
      },
      templateUrl: "/questions/questions-list.html"
    };
  });
