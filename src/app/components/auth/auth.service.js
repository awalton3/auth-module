
function AuthService(Parse) {
  var auth = new Parse.User(); // creates a new user in Parse
  var currentUser = null; //holds info about current user

  /**
 * Takes in user info, then saves that info into currentUser object
 * @param   {object} response  user object
 *
 * @returns {object} returns currentUser object
 */

  function storeAuthData(response) {
    currentUser = response;
    return currentUser;
  }

    /**
   * Clears currentUser info
   *
   * @returns {object} returns a blank user object
   */

  function clearAuthData() {
    currentUser = Parse.User.current(); // this will now be null
    return currentUser;
  }

  /**
 * Takes in user object from auth-form, returns Parse.user, then stores that data in current User object if there is no error
 * @param {object} user user data from auth-form submit
 *
 * @return {object} returns the parse.user object
 */

//Function takes in user inputted data then returns
  this.login = function(user) {
    return Parse.User
      .logIn(user.email, user.password, {
        success: function(auth) {},
        error: function(auth, error) {
          console.log(error);
        }
      })
      .then(storeAuthData);
  };

  /**
 * Takes in user object from auth-form,then stores data in parse
 * @param {object} user user data from auth-form submit
 *
 * @return {object} returns auth
 */

  this.register = function(user) {
    //console.log("User: ", user);
    auth.set("username", user.email);
    auth.set("password", user.password);
    auth.set("email", user.email);
    return auth
      .signUp(null, {
        success: function(auth) {},
        error: function(auth, error) {
          alert("Error: " + error.code + " " + error.message);
        }
      })
      .then(storeAuthData);
  };

  /**
 * Clears current user data
 *
 * @return {object} returns an empty user object
 */

  this.logout = function() {
    return Parse.User.logOut().then(clearAuthData);
  };

  /**
 * Checks for authentication, converts boolean to promise
 *
 * @return {promise} returns a promise, converted from function that returns user authentication
 */

  this.requireAuthentication = function() {
    return new Promise(function(resolve, reject) {
      if (!!currentUser && currentUser.authenticated()) {
        resolve();
      } else {
        reject();
      }
    });
  }

  /**
 * Checks for authentication
 *
 * @return {boolean} returns a true or false statement based on user authentication
 */

  this.isAuthenticated = function() {
    return !!currentUser;
  };

  this.getUser = function() {
    if (currentUser) {
      return currentUser;
    }
  };
};

angular
  .module('components.auth')
  .service('AuthService', AuthService);
