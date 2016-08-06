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
      var defer = $q.defer();

      getFacebookUser() // Ask the user to login to FB.
      .then(function(user){
        oauthLogin(user) // then log them into our system.
        .then(function(response){
          defer.resolve(response); // resolve the promise if they get logged in.
        });
      },function(error){
        defer.reject(error);
      });

      return defer.promise;
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
        if (!response.authResponse){
          defer.reject("No response from Facebook...");
        }
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
        return response;
      })
      .catch(function(err){
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
        return response.data;
      })
      .catch(function(response){
        return $q.reject(response.data);
      });
    }
  }

})();
