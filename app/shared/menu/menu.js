angular.module("app")
.directive("menu", function(){
  return {
    replace: true,
    templateUrl:"/shared/menu/menu.html"
  };
});
