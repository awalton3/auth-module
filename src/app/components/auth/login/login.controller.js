function LoginController(AuthService, $state) {
  var ctrl = this;

  //initialize user data
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = {
      email: '',
      password: ''
    };
  };

  //give user access to app
  ctrl.loginUser = function (event) {
    return AuthService
      .login(event.user)
      .then(function () {
        $state.go('app');
      }, function (reason) {
        ctrl.error = reason.message;
      });
  };
}

angular
  .module('components.auth')
  .controller('LoginController', LoginController);
