import { Template } from 'meteor/templating';
import { RecipeSearch } from '../../model/recipesearch.js';

import './header.html';
import './header_dropdown.js';

Template.header.helpers({
  query() {
    // pre-fill search box text
    var currentRoute = Router.current().route.getName();
    var query = Router.current().params.query;
    if (currentRoute == "search" && query.q) {
      return query.q ;
    }
    else {
      return '';
    }
  }
});

search = function() {
  query = $('input#search_box').val().trim();
  RecipeSearch.search( query );
  Router.go('search', {}, { query: 'q=' + encodeURIComponent(query) } );
}

Template.header.events({
  'keyup input#search_box': search,
  'click i.search': search,
});