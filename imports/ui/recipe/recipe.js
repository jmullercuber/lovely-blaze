import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './recipe.html';

Template.recipe.helpers({
  isOwner() {
    return Meteor.userId() && this.owner == Meteor.userId();
  },
  formatDate(d) {
    t = d.toLocaleDateString().split('/');
    time = t[2] + "-" + t[0] + "-" + t[1];
    return time;
  }
});