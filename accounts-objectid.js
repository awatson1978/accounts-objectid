// the following doesn't work
//Accounts = new Meteor.Collection("users", {idGeneration : 'MONGO'});

if (Meteor.isClient) {
  // a basic list of users
  Template.hello.usersList = function () {
    return Meteor.users.find();
  };
  // and helpers to display the fields
  Template.userListItem.getEmail = function () {
    return this.emails[0].address;
  };
  Template.userListItem.getName = function () {
    if(this.profile){
      return this.profile.name;
    }else{
      return '---';
    }
  };
  // our users subscription
  Deps.autorun(function(){
    Meteor.subscribe ('users');
  });

}

if (Meteor.isServer) {

  Meteor.startup(function () {
    // our users publication
    Meteor.publish("users", function () {
      return Meteor.users.find();
    });

    // we inject some users into the database
    if (Meteor.users.find().count() === 0) {
      console.info('no users in database!  adding some default users');

      var userId = null;

      userId = Accounts.createUser({
        _id: new Meteor.Collection.ObjectID(),
        username: 'gonzo',
        password: 'gonzo',
        email: 'gonzo@test.org',
        profile: {
          name: 'Gonzo'
        }
      });
      console.info('Account created: ' + userId);

      userId = Accounts.createUser({
        _id: new Meteor.Collection.ObjectID(),
        username: 'janice',
        password: 'janice',
        email: 'janice@test.org',
        profile: {
          name: 'Janice'
        }
      });
      console.info('Account created: ' + userId);


      userId = Accounts.createUser({
        _id: new Meteor.Collection.ObjectID(),
        username: 'sam',
        password: 'sam',
        email: 'sam@test.org',
        profile: {
          name: 'Sam the Eagle'
        }
      });
      console.info('Account created: ' + userId);

      userId = Accounts.createUser({
        _id: new Meteor.Collection.ObjectID(),
        username: 'kermit',
        password: 'kermit',
        email: 'kermit@test.org',
        profile: {
          name: 'Kermit the Frog'
        }
      });
      console.info('Account created: ' + userId);

      userId = Accounts.createUser({
        _id: new Meteor.Collection.ObjectID(),
        username: 'mspiggy',
        password: 'mspiggy',
        email: 'mspiggy@test.org',
        profile: {
          name: 'Ms. Piggy'
        }
      });
      console.info('Account created: ' + userId);
    }
  });

  Accounts.onCreateUser(function(options, user) {
    user.profile = user.profile;

    if(user._id._str == undefined){
      user._id = new Meteor.Collection.ObjectID();
    }
    return user;
  });
}
