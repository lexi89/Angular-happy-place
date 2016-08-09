angular.module("flash", [])
.service("flashService", function($rootScope){
  this.message = function(type, message){
    $rootScope.flash = {
      class: type,
      message: message
    };
  };
})
.directive("flashMessage", function(){
  return{
    controller: function ($rootScope, $scope, $timeout) {

      $scope.class = null;
      $scope.message = null;

      $scope.$watch(function()
      {return $rootScope.flash;},
      function(){
        if ($rootScope.flash){
          $scope.class = $rootScope.flash.class;
          $scope.message = $rootScope.flash.message;
          $timeout(function(){
            $rootScope.flash.class = null;
            $rootScope.flash.message = null;
          }, 2000);
        }
      });
    },
    templateUrl:"/shared/flash/flash.html"
  };
});
