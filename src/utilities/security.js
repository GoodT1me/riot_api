import passport from 'passport';

export default (cb = undefined) => passport.authenticate('jwt', {
  session: false
}, cb);
