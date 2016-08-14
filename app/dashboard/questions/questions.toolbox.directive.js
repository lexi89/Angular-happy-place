(function(){

  angular.module("questions")
  .directive("toolbox", function() {
    return{
      templateUrl: "questions/questions.toolbox.html",
      link: function(scope, elem, attrs){
      },
      controller: function($scope){
        $scope.addSymbol = function(symbol){
          this.question.question = this.question.question + symbol;
        };
      }
    };
  });
})();
