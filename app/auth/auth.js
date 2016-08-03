(function(){

  angular.module("auth",["ngRoute"])
    .config(config)
    .controller("authCtrl", AuthCtrl);

    AuthCtrl.$inject = ["$scope","$location",  "authService"];

    function AuthCtrl($scope, $location, service){
      $scope.user = {name: "", email: "", password: ""};

      $scope.facebookLogin = service.facebookLogin;

      $scope.facebookLogout = service.facebookLogout;

      $scope.userInfo = function(){
        FB.api("/me", )
      }

      $scope.localRegister = function(){
        return service.localRegister($scope.user.name, $scope.user.email, $scope.user.password)
        .then(function(success){
          $location.path("/");
          // success. Take user to dashboard.
        }, function(errors){
          // couldn't register, respond with an error.
        });
      };

      $scope.localLogin = function(){
        return service.localLogin($scope.user.email, $scope.user.password)
        .then(function(success){
          $location.path("/");
        }, function(errors){
          // couldn't login. handle errors.
        });

      };
    }

    function config($routeProvider){
      $routeProvider
      .when("/register", {
        templateUrl: "/auth/register.html",
        controller: "authCtrl",
        authenticate: true
      })
      .when("/login", {
        templateUrl: "/auth/login.html",
        controller: "authCtrl",
        authenticate: false
      });
    }

})();
