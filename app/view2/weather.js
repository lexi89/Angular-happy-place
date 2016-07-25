angular
  .module("weather", ["ngRoute"])
  .controller("weatherCtrl", WeatherController)
  .config(config);

function WeatherController($scope){
  $scope.weather = "sun";
}

function config($routeProvider) {
  $routeProvider.when("/view2", {
    templateUrl: "/view2/weatherView.html",
    controller: "weatherCtrl"
  });
}
