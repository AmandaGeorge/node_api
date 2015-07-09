// CLIENT-SIDE JAVASCRIPT

$(function() {

  // `usersController` holds all our phrase funtionality
  var usersController = {
    
    // compile user template
    template: _.template($('#userTemplate').html()),

    all: function() {
      $.get('/users', function(data) {
        var allUsers = data;
        
        // iterate through allUsers
        _.each(allUsers, function(user) {
          // pass each user object through template and append to view
          var $userHtml = $(usersController.template(user));
          $('#userDisplay').append($userHtml);
        });
        // add event-handlers to users for updating/deleting
        usersController.addEventHandlers();
      });
    },

    create: function(newUsername, newFirstname, newLastname, newAge) {
      var userData = {username: newUsername, firstname: newFirstname, lastname: newLastname, age: newAge};
      // send POST request to server to create new user
      $.post('/users', userData, function(data) {
        // pass user object through template and append to view
        var $userHtml = $(usersController.template(data));
        $('#userDisplay').append($userHtml);
      });
    },

    update: function(userId, newUsername, newFirstname, newLastname, newAge) {
      // send PUT request to server to update user

      // pass user object through template and append to view
    },
    
    delete: function(userId) {
      // send DELETE request to server to delete user

      // remove deleted user div from the view
    },

    // add event-handlers to users for updating/deleting
    addEventHandlers: function() {
      // for update: submit event on `.update-user` form

      // for delete: click event on `.delete-user` button
    },

    setupView: function() {
      // append existing users to view
      usersController.all();
      
      // add event-handler to new-user form
      $('#userForm').on('submit', function(event) {
        event.preventDefault();
        var newUsername = $('#username').val();
        var newFirstname = $('#firstname').val();
        var newLastname = $('#lastname').val();
        var newAge = $('#age').val();
        usersController.create(newUsername, newFirstname, newLastname, newAge);
        
        // reset the form
        $(this)[0].reset();
        $('#username').focus();
      });
    }
  };

  usersController.setupView();

});