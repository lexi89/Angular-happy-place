angular
  .module("weather", ["ngRoute"])
  .controller("weatherCtrl", WeatherController)
  .config(["$routeProvider", function($routeProvider){
    $routeProvider
      .when("/", {
        templateUrl: "components/weather/weatherView.html",
        controller: "weatherCtrl"
      });
  }]);

function WeatherController($scope){
  $scope.weather = "sun";
}
