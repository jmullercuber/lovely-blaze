import { Template } from 'meteor/templating';

import './myrecipes.html';

import '../common/recipecard.js';

Template.myrecipes.helpers({
  hasRecipes() {
    return this.length > 0;
  },
});