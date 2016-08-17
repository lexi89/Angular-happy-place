(function () {

  angular.module("app")
  .directive("sidebar", function(){
    return{
      templateUrl: "/sidebar/sidebar.html",
      controller: "sidebarCtrl"
    };
  })
  .controller("sidebarCtrl", function ($scope) {
    $scope.activeSection = "banner";
    $scope.showSettings = function(name){
      $scope.editing = false;
      $scope.activeSection = name;
    };
  });
})();
