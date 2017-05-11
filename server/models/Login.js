var settings = require("./config/settings");
var jwt = require("jwt-simple"); 

exports.createToken = function(userData) {

    // return jwt.encode({
    // 	userID: userData.id,
    //     timestamp: Math.floor(Date.now() / 1000)
    // }, cfg.jwtSecret);

    return jwt.sign(userData, app.get('superSecret'), {
      expiresIn: 10000 
    });
};

exports.validateLdapBind = function(username, password) {

	return new Promise(function(fulfill, reject) {
		fulfill(true);
	});
};

exports.validateToken = function(token) {

  	return new Promise(function(fulfill, reject) {

  		  // check header or url parameters or post parameters for token
		  var token = req.body.token || req.query.token || req.headers['x-access-token'];

		  // decode token
		  if (token) {

		    // verifies secret and checks exp
		    jwt.verify(token, settings.secret, function(err, decoded) {      
		      if (err) {
		        reject(false);
		      } else {
		        // if everything is good, save to request for use in other routes
		        // req.decoded = decoded;    
		        // next();

		        // TODO Current timestamp

		        fulfill(decoded); // Send updated token
		      }
		    });

		  } else {

		    // if there is no token
		    // return an error
		    // return res.status(403).send({ 
		    //     success: false, 
		    //     message: 'No token provided.' 
		    // });
		    reject(false);
		  }


		fulfill(true);
	});
};

// // passport/login.js
// passport.use('login', new LocalStrategy({
//     passReqToCallback : true
//   },
//   function(req, username, password, done) { 
//     // check in mongo if a user with username exists or not
//     collection.findOne({ 'username' :  username }, 
//       function(err, user) {
//         // In case of any error, return using the done method
//         if (err)
//           return done(err);
//         // Username does not exist, log error & redirect back
//         if (!user){
//           console.log('User Not Found with username '+username);
//           return done(null, false, 
//                 req.flash('message', 'User Not found.'));                 
//         }
//         // User exists but wrong password, log the error 
//         if (!isValidPassword(user, password)){
//           console.log('Invalid Password');
//           return done(null, false, 
//               req.flash('message', 'Invalid Password'));
//         }
//         // User and password both match, return user from 
//         // done method which will be treated like success
//         return done(null, user);
//       }
//     );
// }));

// passport.use('signup', new LocalStrategy({
//   passReqToCallback : true
//   },
//   function(req, username, password, done) {
//   findOrCreateUser = function(){
//     // find a user in Mongo with provided username
//     collection.findOne({'username':username},function(err, user) {
//       // In case of any error return
//       if (err){
//         console.log('Error in SignUp: '+err);
//         return done(err);
//       }
//       // already exists
//       if (user) {
//         console.log('User already exists');
//         return done(null, false, 
//            req.flash('message','User Already Exists'));
//       } else {

//         var newUser = {};
//         newUser['username'] = username;
//         newUser['password'] = createHash(password);
//         newUser['email'] = req.param('email');
//         newUser['firstName'] = req.param('firstName');
//         newUser['lastName'] = req.param('lastName');

//         UserModel.createUser(newUser, function(response) {

//         });





//         // if there is no user with that email
//         // create the user
//         var newUser = new User();
//         // set the user's local credentials
//         newUser.username = username;
//         newUser.password = createHash(password);
//         newUser.email = req.param('email');
//         newUser.firstName = req.param('firstName');
//         newUser.lastName = req.param('lastName');

//         // save the user
//         newUser.save(function(err) {
//           if (err){
//             console.log('Error in Saving user: '+err);  
//             throw err;  
//           }
//           console.log('User Registration succesful');    
//           return done(null, newUser);
//         });






//       }
//     });
//   };

// var isValidPassword = function(user, password){
//   return bCrypt.compareSync(password, user.password);
// }
