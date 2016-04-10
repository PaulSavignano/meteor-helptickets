Template.login.helpers({
  userEmail: function() {
    return Meteor.user().emails[0].address;
  }
});

Template.login.events({
  'click .register-link': function(event) {
    $('.panel-login').hide();
    $('.panel-register').fadeIn();
  },
  'click .login-link': function(event) {
    $('.panel-register').hide();
    $('.panel-login').fadeIn();
  },
  'submit .login-form': function(event) {
    event.preventDefault();
    // Get form fields
    var email = event.target.email.value;
    var password = event.target.password.value;

    Meteor.loginWithPassword(email, password, function(error) {
      if (error) {
        event.target.email.value = email;
        event.target.password.value = password;
        FlashMessages.sendError(error.reason);
      } else {
        FlashMessages.sendSuccess('You are now logged in');
        Router.go('/')
      }
    });
    // Clear the form
    event.target.email.value = '';
    event.target.password.value = '';
  },
  'submit .register-form': function(event) {
    event.preventDefault();
    var email = event.target.email.value;
    var password = event.target.password.value;
    var password2 = event.target.password2.value;

    if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, password2)) {
      // Create a new user
      Accounts.createUser({
        email: email,
        password: password,
        profile: {
          usertype: 'customer'
        }
      }, function(error) {
        if (error) {
          FlashMessages.sendError('There was an error with registration');
        } else {
          FlashMessages.sendSuccess('Account created!  You are now logged in');
          Router.go('/');
        }
      });
    }
  },
  'submit .logout-form': function(event) {
    Meteor.logout(function(error) {
      if (error) {
        FlashMessages.sendError(error.reason);
      } else {
        FlashMessages.sendSuccess('You are now logged out');
        Router.go('/');
      }
    });
  }
});

// Validation Rules
// Trim
var trimInput = function(value) {
  return value.replace(/^\s*|\s*$/g, "");
}

// Check for empty fields
isNotEmpty = function(value) {
  if (value && value !== '') {
    return true;
  }
  FlashMessages.sendError("Please fill in all fields");
  return false;
};

// Validate email address
isEmail = function(value) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(value)) {
    return true;
  }
  FlashMessages.sendError("Please use a valid email address");
  return false;
};

// Check password length
isValidPassword = function(password) {
  if (password.length < 6) {
    FlashMessages.sendError("Password must be at least 6 characters.");
    return false;
  }
  return true;
};

// Check if passwords match
areValidPasswords = function(password, confirm) {
  if (!isValidPassword(password)) {
    return false;
  }
  if (password !== confirm) {
    FlashMessages.sendError("Passwords do not match");
    return false;
  }
  return true;
};
