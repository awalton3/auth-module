function RegisterController(AuthService, $state) {
  var ctrl = this;

  //initialize user data
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = {
      email: '',
      password: ''
    };
  };

  //creates a new user and allows access into the app
  ctrl.createUser = function (event) {
    //console.log("user:", event);
    return AuthService
      .register(event.user)
      .then(function () {
        $state.go('app');
      }, function (reason) {
        ctrl.error = reason.message;
      });
  };

}

angular
  .module('components.auth')
  .controller('RegisterController', RegisterController);
