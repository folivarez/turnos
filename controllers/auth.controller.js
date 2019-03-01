var mongoose = require("mongoose");
var passport = require("passport");
const User = require('../models/usuario.models');

var userController = {};

userController.home = function (req, res) {
        //console.log('Request URL:', req.originalUrl);
        
        res.render('login/home',  {layout: false});
        

};


/*userController.doRegister = function(req, res) {
  User.register(new User({ nombre : req.body.nombre, username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      //return res.render('register', { user : user });
      return res.send('ERROR ' + req.body.nombre + ' - ' + req.body.username + ' - ' + req.body.password  + ' -- ' + err);

    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/home');
    });
  });
};*/

/*userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    console.log('entre con login ');
    //console.log(' verifico ' + isLoggedIn);
    //console.log(req);
    res.redirect('/castraciones/user');
  });
};
*/




module.exports = userController;