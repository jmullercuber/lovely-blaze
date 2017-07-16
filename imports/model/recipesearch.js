var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['name', 'description'];

export const RecipeSearch = new SearchSource('recipes', fields, options);