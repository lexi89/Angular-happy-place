angular
  .module("app.directive1",[])

  .directive("appNav",function () {
    return {
      templateUrl: "components/directive-template.html"
    };
  });
