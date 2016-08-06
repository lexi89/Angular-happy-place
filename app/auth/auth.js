(function(){

  angular.module("auth",["ngRoute"])
    .config(config)
    .controller("authCtrl", AuthCtrl);

    AuthCtrl.$inject = ["$scope","$location",  "authService", "flashService"];

    function AuthCtrl($scope, $location, service, flash){
      $scope.user = {};



      $scope.facebookLogout = service.facebookLogout;

      $scope.facebookRegister = service.facebookRegister;

      $scope.facebookLogin = function () {
        service.facebookLogin()
        .then(function(response){
          console.log(response);
          flash.message("success", "logged in");
          $location.path("/");
        }, function(error){
            console.log(error);
            flash.message("alert", error);
        });
      };

      $scope.localRegister = function(){
        return service.localRegister($scope.user.name, $scope.user.email, $scope.user.password)
        .then(function(success){
          $location.path("/");
          flash.message("success", "Registered");
          // success. Take user to dashboard.
        }, function(errors){
          console.log(errors);
        });
      };

      $scope.localLogin = function(){
        return service.localLogin($scope.user.email, $scope.user.password)
        .then(function(success){
          flash.message("success", "logged in");

          // $location.path("#/");
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
