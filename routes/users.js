const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');
const Bean = require('../models/bean')

//Register
router.post('/register', (req, res, next)  => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'})
    }else{
      res.json({success: true, msg:'User registered'});
    }
  });
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg:'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret,{
          expiresIn: 604800 // 1 week
        });
        res.json({
          success:true,
          token: 'JWT  ' +token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong Password'});
      }
    });
  });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

//Dashboard
router.get('/dashboard', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  User.findOne({_id: req.user._id})
  .populate({path:'beans', options:{sort:{'date': -1}}})
  .exec(function(err,user){
      res.json({user: user});
  })
});

//New Bean
router.post('/newbean', (req, res, next)  => {
  const newBean = new Bean({
    name: req.body.name,
    profile: req.body.profile,
    origin: req.body.origin,
    roast: req.body.roast,
    comments: req.body.comments,
    _user: req.body._user
    });
  Bean.addBean(newBean, (err, bean) => {
    if(err){
      res.json({success: false, msg:'Failed to add bean'})
    }else{
      res.json({success: true, msg:'Bean added'});
    }
  });
})

  //Get Bean to Edit
router.get('/edit/:id', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  Bean.findOne({_id: req.params.id}, function (err, bean){
    if(err) throw err;
    res.json({bean: bean})
  })
});

//Update Bean
router.post('/edit/:id', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  Bean.findOne({_id: req.params.id}, function (err, bean){
    if(err){
      res.json('Could not find Bean')
    } else {
      bean.name = req.body.name || bean.name;
      bean.profile = req.body.profile || bean.profile;
      bean.origin = req.body.origin || bean.origin;
      bean.roast = req.body.roast || bean.roast;
      bean.comments = req.body.comments || bean.comments;
      bean.save(function(err, bean){
        if(err){
          res.json({success: false, msg:'Failed to update bean'})
        } else {
          res.json({success: true, msg:'Bean added'});
        }
      })
    }
  })
});

//Delete Bean
router.post('/delete/:id', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const user = req.body.user
  Bean.findOneAndRemove({_id: req.params.id}, function (err, bean){
    if(err) throw err;
      User.findOneAndUpdate({_id: req.user.id},{$pull:{beans: req.params.id}}, function(err, user){
        if(err){
          res.json({success: false, msg:'Failed to update bean'})
        } else {
          res.json({success: true, msg:'Bean added'});
      }
    })
  });
});

module.exports = router;
