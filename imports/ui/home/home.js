import { Template } from 'meteor/templating';

import './home.html';

import '../common/recipecard.js';

Template.home.helpers({
  recent_activity: () => [
    {owner:"You", details:"wrote a new Baked Chicken recipe", time:"5min"},
    {owner:"Prodeo", details:"made Steamed Asparagus", time:"3hr"},
    {owner:"Abraham", details:"wrote a Delicious Waffles recipe", time:"2d"},
    {owner:"Sam", details:"made Green Waffles", time:"1wk"},
  ],
});