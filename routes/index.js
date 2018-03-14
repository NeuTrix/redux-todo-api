let express = require('express');
let passport = require('passport');
let User = require('../models/user');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { user: req.user });
});

router.get('/register', function(req, res) {
	res.render('register', { });
})

router.get('/login', function(req, res) {
	res.render('login', { user: req.user });
})

router.post('/login', function(req, res) {
// router.post('/login', passport.authenticate('local'), function(req, res) {
	res.redirect('/');
})

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
})

module.exports = router;
