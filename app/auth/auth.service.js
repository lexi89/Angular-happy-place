(function(){
  angular.module("auth")
  .factory("authService", service);

  service.$inject = ["$http", "$q", "$location"];

  function service($http, $q, $location){
    var service = {
      facebookLogin: facebookLogin,
      facebookRegister: facebookRegister,
      localRegister: localRegister,
      localLogin: localLogin,
      facebookLogout: facebookLogout,
      oauthLogin: oauthLogin
    };

    return service;
    ////////////////////////////

    function facebookLogin(){

    }

    function facebookRegister(){

    }

    function getFacebookUser(){

    }

    function facebookLogout(){

    }

    function localRegister(username, email, password){

    }

    function oauthLogin(user){

    }

    function localLogin(email, password, oauthID){

    }

  }

})();
