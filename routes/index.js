const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


router.get('/',(req,res)=>{
	res.render('landingpage');
});

router.get('/home',(req,res)=>{
	res.render('loading');
});

module.exports = router;