const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('Google OAuth callback triggered');
        console.log('Profile:', profile);
        console.log('Access Token:', accessToken);

        return done(null, profile);
      } catch (err) {
        console.error('Error in Google OAuth Strategy:', err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);  
});

passport.deserializeUser((obj, done) => {
  done(null, obj);  
});

module.exports = passport;
