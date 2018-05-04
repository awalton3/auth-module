angular
  .module('components.auth', [
    'ui.router',
    'ngParse'
  ])
  .config(function (ParseProvider) {

        var MY_PARSE_APP_ID = 'gCzy5QzwosCOQ0mpzqseBFy1aPxTt8MFmSa5McsH';
        var MY_PARSE_JS_KEY = 'e6A01sItBnQujBgZToH8yzwz28AskSVlwBN9G8tW';
        ParseProvider.initialize(MY_PARSE_APP_ID, MY_PARSE_JS_KEY);
        ParseProvider.serverURL = 'https://parseapi.back4app.com/';

    })

  .run(function ($transitions, $state, AuthService) {
    $transitions.onStart({
      to: function (state) {
        return !!(state.data && state.data.requiredAuth);
      }
    }, function() {
      return AuthService
        .requireAuthentication()
        .catch(function () {
          return $state.target('auth.login');
        });
    });
    $transitions.onStart({
      to: 'auth.*'
    }, function () {
      if (AuthService.isAuthenticated()) {
        return $state.target('app');
      }
    });
  });
