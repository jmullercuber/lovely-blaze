import { Template } from 'meteor/templating';

import './edit.html';

Template.edit.helpers({
  expand(arr) {
    return arr.join('\n')
  },
});

Template.edit.events({
  'click button#requestErase'(event) {
    // Prevent default browser action
    event.preventDefault();
    
    // gotta be defined up here
    _id  = this._id;
    
    // need a confirm box!
    $('.ui.basic.modal#eraseModal')
      .modal({
        // only need handeler for yes button
        onApprove : function() {
          // erase it
          Meteor.call('recipes.erase', _id, function(error, results) {
            if (error) {
              console.log(error.reason);
            } else {
              // redirect to home page
              Router.go('landing');
            }
          });
        }
      })
      .modal('show')
    ;
  },
  'click button#submit'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    
    data = {
      "_id": this._id,
      //"cookTime": "PT1H",
      //"prepTime": "PT15M",
      "name": $('input#recipeName').val().trim(),
      "description": $('input#recipeDescription').val().trim(),
      //"recipeYield": "1 loaf",
      //"image": "bananabread.jpg",
      "ingredients": $('textarea#recipeIngredient').val().split("\n"),
      "instructions": $('textarea#recipeInstructions').val().split("\n"),
    };  // end recipe def
    
    // Write the recipe!
    Meteor.call('recipes.update', data, function(error, results) {
      if (error) {
        console.log(error.reason);
      } else {
        // redirect to recipe page
        Router.go('recipe', { _id: results });
      }
    });
  },
});