angular
    .module("todos", ["ngRoute"])
    .controller("todoCtrl", TodoController)
    .config(config);

  TodoController.$inject = ["todoservice"];

  function TodoController(todoservice){
    this.example = "Buy milk";
    this.hello = todoservice.hello;
    this.goodbye = todoservice.goodbye;
  }

  function config($routeProvider){
    $routeProvider.when("/view1", {
      templateUrl: "/view1/todoView.html",
      controller: "todoCtrl",
      controllerAs: "todos"
    });
  }
