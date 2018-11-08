const passport = require('passport');

export default passport.authenticate('jwt', { session: false });


// export default passport.authenticate('jwt', { session: false }, (err, user, info) => {
//       if (user) {
//         req.user = user
//       }
  
//       next()
//     })(req, res, next);