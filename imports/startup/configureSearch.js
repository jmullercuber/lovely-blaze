import { Recipes } from '../model/recipes.js';

// Search
SearchSource.defineSource('recipes', function(searchText, options) {
  var options = {sort: {isoScore: -1}, limit: 20};

  if (searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [
      {name: regExp},
      {description: regExp}
    ]};

    return Recipes.find(selector, options).fetch();
  }
  else {
    return Recipes.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}
