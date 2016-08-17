(function () {

  angular.module("app")
  .directive("widgetsSettings", function(){
    return {
      templateUrl: "/sidebar/widgets/widgets.html",
      controller: "widgetsController"
    };
  })
  .controller("widgetsController", function ($scope) {
    $scope.editing = false;

    $scope.editWidget = function(name){
      $scope.editing = name;
    };
  });

})();
