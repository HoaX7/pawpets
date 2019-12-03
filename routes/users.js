const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const methodOverride = require('method-override');
const passport = require('passport');
const { Client } = require('pg');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

router.use(methodOverride("_method"));

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('home'));

// Register Page
router.get('/sign', forwardAuthenticated, (req, res) => res.render('sign'));

// Register
router.post('/sign', (req, res) => {
  const { name, email, phone, password, password2, gender } = req.body;
  let errors = [];

  if(gender == '1'){
    req.body.gender = 'Male'
  }

  if(gender == '2'){
    req.body.gender = 'Female'
  }

  if(gender == '3'){
    req.body.gender = 'Others'
  }

  if (!name || !email || !phone || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (phone.length < 10) {
  	errors.push({msg: 'Please enter a 10 digit phone number'});
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('sign', {
      errors,
      name,
      email,
      phone,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('sign', {
          errors,
          name,
          email,
          phone,
          password,
          password2
        });
      } else {
        const client = new Client();
        client.connect()
        .then(()=>{
          const sql = 'INSERT INTO customer (cusname,email,phone,roles,gender) VALUES($1,$2,$3,$4,$5)';
          const params = [req.body.name,req.body.email,req.body.phone,req.body.roles,req.body.gender];
          return client.query(sql,params);
        })
        .catch((err)=>{
          console.log(err);
        });
        const newUser = new User({
          name,
          email,
          phone,
          password
        });
        if(req.body.gender == 'Female' || req.body.roles == 'Others'){
          newUser.gen = false;
        }
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/pets',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});



// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});

//Admin creating users
router.post('/newUser', (req, res) => {
  const { name, email, phone, password, roles, gender} = req.body;
  let errors = [];

  if(gender == '1'){
    req.body.gender = 'Male'
  }

  if(gender == '2'){
    req.body.gender = 'Female';
  }

  if(gender == '3'){
    req.body.gender = 'Others'
  }

  if ( roles == '1' ) {
    req.body.roles = 'Manager'
  }

  if ( roles == '2' ) {
    req.body.roles = 'Employee'
  }

  if ( roles == '3' ) {
    req.body.roles = 'Customer'
  }

  if (!name || !email || !phone || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (phone.length < 10) {
  	errors.push({msg: 'Please enter a 10 digit phone number'});
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('add', {
      errors,
      name,
      email,
      phone,
      password
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('add', {
          errors,
          name,
          email,
          phone,
          password
        });
      } else {    
        const client = new Client();
        client.connect()
        .then(()=>{
          const sql = 'INSERT INTO customer (cusname,email,phone,roles,gender) VALUES($1,$2,$3,$4,$5)';
          const params = [req.body.name,req.body.email,req.body.phone,req.body.roles,req.body.gender];
          return client.query(sql,params);
        })
        .catch((err)=>{
          console.log(err);
        }); 
        const newUser = new User({
          name,
          email,
          phone,
          password
        });
        if(req.body.roles == 'Employee' || req.body.roles == 'Manager'){
          newUser.isAdmin = true;
        }
        if(req.body.gender == 'Female' || req.body.gender == 'Others'){
          newUser.gen = false;
        }
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'User successfully created'
                );
                res.redirect('/users');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

//update username
router.put('/profiles/:id/edit',(req,res)=>{
  var id = req.params.id;
  var name = req.body.name;
  User.update({_id:id},{$set: {name: name}}).then(x=>{
    console.log('updated');
  }).catch(err=>{
    res.redirect('/profiles');
    console.log(err)});
  const client = new Client();
  client.connect()
  .then(()=>{
    const sql = 'UPDATE customer SET cusname = ($1) WHERE email = '+"'"+req.body.email+"'";
    const params = [req.body.name];
    return client.query(sql,params);
  })
  .then(()=>{
    req.flash(
      'success_msg',
      'Updated'
      );
    res.redirect('/profiles');
  })
  .catch(err=>{
    req.flash(
      'error_msg',
      'Something went wrong, please try again after a while'
      );
    res.redirect('/profiles');
    console.log(err);
  })
});

//delete user
router.get('/users/:em',(req,res)=>{
  var email = req.params.em;
  User.findOneAndDelete({email: email}).then(x=>{
    console.log('deleted');
  }).catch(err=>{
    res.redirect('/users');
    console.log(err)
  });
  const client = new Client();
    client.connect()
      .then(()=>{
        const sql = 'DELETE FROM customer WHERE email = '+"'"+req.params.em+"'";
        return client.query(sql);
      })
      .then(()=>{
        req.flash(
            'error_msg',
            'User Deleted'
        );
        res.redirect('/users');
      });
});

module.exports = router;
