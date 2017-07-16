import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './header_dropdown.html';

//http://stackoverflow.com/a/30834745
dropdown = function(){
  // Make the drop down work
  $('.ui.dropdown').dropdown({
    action: 'hide',
  });
};

Template.header_dropdown_user.onRendered(dropdown);
Template.header_dropdown_nouser.onRendered(dropdown);

Template.header_dropdown_user.events({
  'click div.logout'() {
    Meteor.logout();
    Router.go('landing');
  },
});

Template.header_dropdown_nouser.events({
  'click .facebook_login'() {
    Meteor.loginWithFacebook({
      requestPermissions: ['email']
    }, function (err) {
      if(err) {
        console.log('Error login_Facebook: ' + err.reason);
      }
    });
  },
  
  'click .google_login'() {
    Meteor.loginWithGoogle({
      requestPermissions: ['email']
    }, function (err) {
      if(err) {
        console.log('Error login_Google: ' + err.reason);
      }
    });
  },
});