import { Template } from 'meteor/templating';

import './rating.html';

Template.rating.onRendered(function(){
  d = this.data
  r = 0;
  if (d.userInteractionCount != 0) {
    r = Math.round( d.userInteractionTotal / d.userInteractionCount );
  }
  $(this.firstNode)
    .rating({
      initialRating: r,
    })
    .rating('disable');
});