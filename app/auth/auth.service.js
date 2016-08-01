(function(){
  angular.module("auth")
  .factory("authService", service);

  function service($http, $q){
    var service = {
      facebookLogin: facebookLogin,
      localLogin: localLogin
    };

    return service;
    ////////////////////////////
    function facebookLogin(){
      // fblogin
    }

    function localLogin(username, email, password){
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

  }

})();
