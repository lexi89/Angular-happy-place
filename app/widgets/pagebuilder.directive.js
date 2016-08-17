(function(){

  angular.module("app")
  .directive("pageBuilder", function($compile){
    return function(scope, elem, attrs){
      scope.$watchCollection(getSections, build);
      // watch for changes to the list of page widgets

      function getSections(){
        // get the array-like object.
        var activeSections = [];
        for (var i in scope.profile){
          if (scope.profile[i] !== null){
            activeSections.push(i);
          }
        }
        return activeSections;
      }

      function build(){
        // clear the current build.
        elem.children().remove();

        // get the sections.
        var activeWidgets = getSections();

        var html = "";
        // add each section to the html string
        angular.forEach(activeWidgets, function(name){
          html += "<" + name + "></" + name + "><br/>";
        });

        // create new jqlite angular element
        var widgetsHTML = angular.element(html);

        // append to DOM
        elem.append(widgetsHTML);

        // call $compile to check for directives again.
        var compiled = $compile(widgetsHTML);

        // tie to current scope.
        compiled(scope);
      }
    };
  });

})();
