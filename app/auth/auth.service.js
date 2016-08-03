(function(){
  angular.module("auth")
  .factory("authService", service);

  service.$inject = ["$http", "$q"];

  function service($http, $q){
    var service = {
      facebookLogin: facebookLogin,
      localRegister: localRegister,
      localLogin: localLogin,
      facebookLogout: facebookLogout
    };

    return service;
    ////////////////////////////
    function facebookLogin(){
      FB.login(function(response){
        console.log(response);
      });
    }

    function facebookLogout(){
      FB.logout(function(response){
        console.log(response);
      });
    }

    function localRegister(username, email, password){
      return $http({
        method: "POST",
        url: "/register",
        headers: {
          "Content-type" : "application/json"
        },
        data: {
          "name": username,
          "email": email,
          "password": password
        }
      }).then(function(response){
        return response.data;
      })
      .catch(function(response){
        return $q.reject(response.data.errors);
      });
    }

    function localLogin(email, password){
      return $http({
        method: "POST",
        url: "/login",
        headers: {
          "Content-type" : "application/json"
        },
        data: {
          "username": email,
          "password": password
        }
      })
      .then(function(response){
        console.log("service: success!");
        return response.data;
      })
      .catch(function(response){
        console.log("service: fail!");
        console.log(response);
        return $q.reject(response.data);
      });
    }
  }

})();
