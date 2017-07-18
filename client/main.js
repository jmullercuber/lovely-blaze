import { Meteor } from 'meteor/meteor';

import { Recipes } from '../imports/model/recipes.js';

import '../imports/ui/common/header.js';
import '../imports/ui/common/footer.js';
import '../imports/ui/home/home.js';
import '../imports/ui/about/about.js';
import '../imports/ui/search/search.js';
import '../imports/ui/recipe/recipe.js';
import '../imports/ui/create/create.js';
import '../imports/ui/myrecipes/myrecipes.js';
import '../imports/ui/edit/edit.js';


checkSignedIn = function() {
  var currentUser = Meteor.userId();
  if (currentUser) {
    this.next();
  } else {
    this.render("not-signedIn");
  }
}

// routing by Iron Router
// http://meteortips.com/second-meteor-tutorial/iron-router-part-1/
Router.route('/', {
  name: 'home',
  template: 'home',
  data: function() {
    rlist = Recipes.find({}).fetch();
    return {
      trending: rlist,
    };
  },
  waitOn: function() {
    return Meteor.subscribe('recipesLastest', 4);
  },
  onBeforeAction: function() {
    var currentUser = Meteor.userId();
    if (currentUser) {
      this.next();
    } else {
      // for the moment, home content is not dependent on user. Same stuff
      // will have to render different template/modify template for non-users
      // this.render("about");
      this.next();
    }
  },
});

// ex: /about
Router.route('/about', {
  name: 'about',
  template: 'about',
});

// ex: /search?q=bread
Router.route('/search', {
  name: 'search',
  template: 'search',
});

// ex: /my-recipes
Router.route('/my-recipes', {
  name: 'my-recipes',
  template: 'myrecipes',
  data: function() {
    rlist = Recipes.find({}).fetch();
    return rlist;
  },
  waitOn: function() {
    return Meteor.subscribe('recipesByMe');
  },
  onBeforeAction: checkSignedIn,
});

// ex: /create
Router.route('/create', {
  name: 'create',
  template: 'create',
  onBeforeAction: checkSignedIn,
});

// ex: /recipe/1mc0ifnrWu4
Router.route('/recipe/:_id', {
  name: 'recipe',
  template: 'recipe',
  data: function() {
    var recipeId = this.params._id;
    r = Recipes.findOne({ _id: recipeId });
    return r;
  },
  waitOn: function() {
    return Meteor.subscribe('recipeById', this.params._id);
  },
});

// ex: /edit/1mc0ifnrWu4
Router.route('/edit/:_id', function () {
  // redirect
  Router.go('edit', { _id: this.params._id });
});

// ex: /recipe/edit/1mc0ifnrWu4
Router.route('/recipe/edit/:_id', {
  name: 'edit',
  template: 'edit',
  data: function() {
    var recipeId = this.params._id;
    r = Recipes.findOne({ _id: recipeId });
    return r;
  },
  waitOn: function() {
    return Meteor.subscribe('recipeById', this.params._id);
  },
  onBeforeAction: function() {
    var currentUser = Meteor.userId();
    
    // check user is signed in
    if (!currentUser) {
      this.render("not-signedIn");
    }
    
    // chech user owns recipe
    // as a possible security question, is data read on client??
    // btw this evals to true for recipes with no owner and user not signed in
    // hence must check if user signed in first
    else if (Router.current().data().owner != currentUser) {
      this.render("access-denied");
    }
    
    // all gucci
    else {
      this.next();
    }
  },
});

Router.configure({
    layoutTemplate: 'main',
    loadingTemplate: 'loading',
    notFoundTemplate: 'not-found',
});
