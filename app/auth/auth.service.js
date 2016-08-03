(function(){
  angular.module("auth")
  .factory("authService", service);

  service.$inject = ["$http", "$q"];

  function service($http, $q){
    var service = {
      facebookLogin: facebookLogin,
      localRegister: localRegister,
      localLogin: localLogin,
      facebookLogout: facebookLogout,
      oauthLogin: oauthLogin
    };

    return service;
    ////////////////////////////
    function facebookLogin(){
      FB.login(function(response){
        facebookID = response.authResponse.userID;
        FB.api("/" + facebookID + "?fields=email", function(user){
          oauthLogin(user.email, user.id);
        });



        // user logs in with FB.
        // grab user's email address from FB api.
        // log the user in via local portal with their email address and facebookID.
      },
      {
        scope: 'email, public_profile',
        return_scopes: true
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

    function oauthLogin(email, id){
      return $http({
        method: "POST",
        url: "oauthlogin",
        headers:{
          "Content-type": "application/json"
        },
        data: {
          "email" : email,
          "id": id
        }
      })
      .then(function(response){
        console.log(response);
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
