// Help from https://themeteorchef.com/recipes/roll-your-own-authentication/#tmc-configuring-third-party-services

// Helper function for configuring services
createServiceConfiguration = function(service) {
  ServiceConfiguration.configurations.upsert(
    {service: service},
    {$set: Meteor.settings.oauth[service]}
  );
}

// Configure each login service
createServiceConfiguration('facebook')
createServiceConfiguration('google')

// What to do with new user accounts
Accounts.onCreateUser(function(options,user) {
  // save profile info if possible
  if (options.profile) {
    user.profile = options.profile;
  }

  user.madeIt = {};

  // return the user document to insert into my db
  return user;
})

determineEmail = function(user) {
  if (user.emails) {
    emailAddress = user.emails[0].address;
  }
  else if (user.services.facebook) {
    emailAddress = services.facebook.email;
  }
  else if (user.services.google) {
    emailAddress = services.google.email;
  }
  return emailAddress;
}
