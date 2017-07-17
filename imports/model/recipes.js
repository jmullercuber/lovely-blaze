import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Recipes = new Mongo.Collection("recipes");

// insecure package removed so
// Deny all client-side changes to dbs

if (Meteor.isServer) {
  // This code only runs on the server
  // Publish all recipes
  Meteor.publish("recipes", function() {
    return Recipes.find({}, {
      //fields:
    });
  });
  
  // The latest n recipes
  Meteor.publish("recipesLastest", function(n) {
    return Recipes.find({}, {
      sort: {datePublished: -1},
      limit: Math.max(1, Math.min(10, Number(n) || 4) ),
    });
  });
  
  // Publish recipes with id
  Meteor.publish("recipeById", function(recipeId) {
    return Recipes.find({_id: recipeId});
  });
  
  // // Publish recipes with owner
  // Meteor.publish("recipesByOwner", function(userId) {
  //   return Recipes.find({owner: userId});
  // });
  
  // Publish recipes by currently logged in user
  Meteor.publish("recipesByMe", function() {
    return Recipes.find({owner: this.userId || ''});
  });
} else if (Meteor.isClient) {
  // actually subscriptions happen at routing
}

Meteor.methods({
  'recipes.writeNew': function(data) {
    currentUser = Meteor.user();
    
    if (!currentUser) {
      throw new Meteor.Error("not-logged-in", "Attempted creating a new recipe. You're not logged-in");
    }
    
    // need to check correct data types and fields
    check(data.name, String);
    check(data.description, String);
    for (let i of data.ingredients) {
      check(i, String);
    }
    for (let i of data.instructions) {
      check(i, String);
    }
    
    recipe = {
      "@type": "Recipe",
      "owner": currentUser._id,
      "author": currentUser.profile.name,
      //"cookTime": "PT1H",
      //"prepTime": "PT15M",
      "datePublished": new Date(),
      "name": data.name,
      "description": data.description,
      //"recipeYield": "1 loaf",
      //"image": "bananabread.jpg",
      "recipeIngredient": data.ingredients,
      "interactionStatistic": {
        "@type": "Rating",
        "userInteractionCount": "0",
        "userInteractionTotal": "0"
      },
      "recipeInstructions": data.instructions,
    };  // end recipe def
    
    return Recipes.insert(recipe);
  },
  
  'recipes.update': function(data) {
    currentUser = Meteor.user();
    
    if (!currentUser) {
      throw new Meteor.Error("not-logged-in", "Attempted editing a recipe. You're not logged-in");
    }
    
    // check if it is your recipe
    check(data._id, String);
    currentRecipe = Recipes.findOne(data._id);
    if (currentRecipe.owner != currentUser._id) {
        throw new Meteor.Error("invalid-user", "You don't own this recipe!");
    }
    
    // need to check correct data types and fields
    check(data.name, String);
    check(data.name, String);
    check(data.description, String);
    for (let i of data.ingredients) {
      check(i, String);
    }
    for (let i of data.instructions) {
      check(i, String);
    }
    
    Recipes.update(
      {_id: data._id},
      {$set:{
        name: data.name,
        description: data.description,
        recipeIngredient: data.ingredients,
        recipeInstructions: data.instructions,
      }}
    );
    
    // return the document id
    return data._id;
  },
  
  'recipes.erase': function(_id) {
    currentUser = Meteor.user();
    
    if (!currentUser) {
      throw new Meteor.Error("not-logged-in", "Attempted deleting a recipe. You're not logged-in. Smh, what a crime.");
    }
    
    // check if it is your recipe
    check(_id, String);
    currentRecipe = Recipes.findOne(_id);
    if (currentRecipe.owner != currentUser._id) {
        throw new Meteor.Error("invalid-user", "You don't own this recipe! Smh, what a crime.");
    }
    
    Recipes.remove(_id);
  },
});
