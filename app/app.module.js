(function(){

  angular.module("app", [
    'ngRoute'
  ])
  .controller("mainCtrl", function ($scope) {
    $scope.sections = ["hero"];
    $scope.settings = {
      banner: {
        subhead: "Subhead",
        title: "Title",
        intro: "intro"
      }

    };
    $scope.sidebar = false;
    $scope.editMode = false;

    $scope.toggleEditMode = function(){
      $scope.editMode = !$scope.editMode;
    };
  });

})();
