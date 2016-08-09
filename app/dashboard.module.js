// Declare app level module, which depends on views and components.
angular.module("app", [
  'ngRoute',
  'ngAnimate',
  'questions',
  'auth',
  'flash'
])
.controller("mainCtrl", function($scope){
  $scope.modal = false;
  $scope.toggleModal = function(){
    $scope.modal = (!$scope.modal);
  };
});
