// This directive handles all math and key logic upon entry.

angular.module("questions")
  .directive("onlyMath", function(){
    return{
      link: function(scope, elem, attrs){

        elem.on("keydown", function(){
          if (event.which === 13){
            scope.saveQuestion(); // Save the question with enter key.
          }
          // Don't allow unsafe keys.
          if (!isValid(event.key)){
            event.preventDefault();
          }
        });

        elem.on("keyup", function(){
          if (isSolveTrigger(event.key)){
            scope.solveQuestion();
          }
        });

        function isValid(key){
          if (
              (key === "=") ||
              (key === "Delete")
            ){return false;} else { return true;}
        }

        function isSolveTrigger(key){
          return ((!isNaN(key)) || (key === "Backspace"));
        }

        function getQuestion(){
          return scope.question.question;
        }

      },
    };
  });
