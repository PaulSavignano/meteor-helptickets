Template.login.events({
  'click .register-link': function(event) {
    $('.panel-login').hide();
    $('.panel-register').fadeIn();
  },
  'click .login-link': function(event) {
    $('.panel-register').hide();
    $('.panel-login').fadeIn();
  }
});
