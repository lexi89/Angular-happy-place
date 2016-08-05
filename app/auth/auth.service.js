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
      getFacebookUser()
      .then(function(user){
        oauthLogin(user);
      },function(error){
        console.log(error);
      });
    }

    function facebookRegister(){
      getFacebookUser()
      .then(function(user){
        return $http({
          url: "/oauthregister",
          method: "POST",
          headers: {
            "Content-type" : "application/json"
          },
          data: {
            "name": user.email,
            "id": user.id,
            "email": user.email
          }
        })
        .then(function (response) {
          return response;
        })
        .catch(function (err) {
          return err;
        });
      }, function(error){
        console.log(error);
      });
    }

    function getFacebookUser(){
      var user = {};
      var defer = $q.defer();

      FB.login(function(response){
        user.id = response.authResponse.userID;

        FB.api("/" + user.id + "?fields=email", function(response){
          user.email = response.email;
          defer.resolve(user);
        });
      },
      {
        scope: 'email, public_profile',
        return_scopes: true
      });

      return defer.promise;
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

    function oauthLogin(user){
      return $http({
        method: "POST",
        url: "oauthlogin",
        headers:{
          "Content-type": "application/json"
        },
        data: {
          "email" : user.email,
          "id": user.id
        }
      })
      .then(function(response){
        console.log(response);
        $location.path("/");
      })
      .catch(function(err){
        console.log(err);
      });
    }

    function localLogin(email, password, oauthID){
      // 2 types of local login. via oAuth or form.

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
