import { Meteor } from 'meteor/meteor';

import { Recipes } from '../model/recipes.js';

// code to run on server at startup
Meteor.startup(function() {
    // Reset the db
    //Recipes.remove({});

    // No Recipes have been added to db yet
    console.log("Recipes.find().count ==" + Recipes.find().count());
    if (Recipes.find().count() == 0) {
      // get the file with all the recipe data
      var recipes = Assets.getText("joey_recipes-min.json").split("\n");

      // add every recipe to the db
      // -1 because last line is blank
      for (var i=0; i<recipes.length-1; i++) {
        // logging
        if (i % 1 == 0) {
          console.log("Added " + i + " recipes so far");
        }

        // object of current element
        e = JSON.parse( recipes[i] );
        r = e;
        r.datePublished = new Date(r.datePublished);

        /* Transform/Data Validation goes here */
        // Constant object id (even when database restarts)
        r._id = encodeURIComponent( i+'-'+r.name.substr(0,15) );

        // Push the valid recipe into the db
        Recipes.insert( r );
      }
    }
    console.log("Done loading recipes to DB");
});
