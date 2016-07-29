// only allows users to type specified keys in an text field

angular.module("questions")
  .directive("onlyMath", function(){
    return{
      link: function(scope, elem, attrs){
        var regexp = new RegExp(/(\d|\*|\+|\-|\+)/, "g");

        elem.on("keypress", function(){ // on keypress
          // prevent any non-valid chars from being added to the model.
          if (isValid(event.key) !== 0){
            if (event.which === 13){
              scope.saveQuestion();
              // allow the enter key
            }
            event.preventDefault();
            // add some UX feedback here
          }

          function isValid(key){
            return key.search(regexp);
          }

        });
      }
    };
  });
