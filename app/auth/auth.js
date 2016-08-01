(function(){

  angular.module("auth",["ngRoute"])
    .config(config)
    .controller("authCtrl", AuthCtrl);

    AuthCtrl.$inject = ["$scope","$location",  "authService"];

    function AuthCtrl($scope, $location, service){
      $scope.user = {name: "", email: "", password: ""};

      $scope.facebookLogin = service.facebookLogin;

      $scope.localLogin = function(){
        return service.localLogin($scope.user.name, $scope.user.email, $scope.user.password)
        .then(function(success){
          $location.path("/");
          // success. Take user to dashboard.
        }, function(errors){
          // couldn't register, respond with an error.
        });
      };
    }

    function config($routeProvider){
      $routeProvider.when("/login", {
        templateUrl: "/auth/login.html",
        controller: "authCtrl"
      });
    }

})();
