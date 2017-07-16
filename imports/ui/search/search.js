import { Template } from 'meteor/templating';
import { RecipeSearch } from '../../model/recipesearch.js';

import './search.html';

import '../common/recipecard.js';

Template.search.onRendered(function(){
  RecipeSearch.search( Router.current().params.query.q );
});

Template.search.helpers({
  query() {
    return decodeURIComponent( Router.current().params.query.q );
  },
  
  getResults() {
    return RecipeSearch.getData({
      sort: {isoScore: -1},
    });
  },  // end helper function getResults
  
  isLoading: function() {
    return RecipeSearch.getStatus().loading;
  },  // end helper function isLoading
});