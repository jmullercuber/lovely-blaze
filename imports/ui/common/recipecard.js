import { Template } from 'meteor/templating';

import './recipecard.html';
import './rating.js';

Template.recipecard.helpers({
  shortDesc(longDesc) {
    if (longDesc && longDesc.length <= 100) {
      return longDesc;
    }
    else {
      return longDesc.substr(0, 97) + "...";
    }
  },
});