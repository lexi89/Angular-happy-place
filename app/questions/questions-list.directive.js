angular
  .module("questions")
  .directive("questionsList", function(){
    return{
      templateUrl: "/questions/questions-list.html"
    };
  });
