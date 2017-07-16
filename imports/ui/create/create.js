import { Template } from 'meteor/templating';

import './create.html';

Template.create.events({
  'click button#submit'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    
    data = {
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
    Meteor.call('recipes.writeNew', data, function(error, results) {
      if (error) {
        console.log(error.reason);
      } else {
        // should redirect here
        Router.go('recipe', { _id: results });
        //$('[name=listName]').val('');
      }
    });
  },
});