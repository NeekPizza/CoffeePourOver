const mongoose = require('mongoose');
const config = require('../config/database');
const Schema = mongoose.Schema;
const User = mongoose.model('User')

//Bean Schema
const BeanSchema = new mongoose.Schema({
  _user: {
    type:Schema.Types.ObjectId, ref:'User'
  },
  name: {
    type: String,
    required: true
  },
  profile: {
    type: String,
  },
  origin: {
    type: String,
  },
  roast: {
    type: String,
  },
  comments: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
});

const Bean = module.exports = mongoose.model('Bean',BeanSchema);


module.exports.addBean = function(newBean, callback){
  console.log(newBean)
  newBean.save(callback)
  let user = User.findOne({_id: newBean._user}, function (err,user){
    user.beans.push(newBean._id)
    user.save(function(err){
      if(err) throw err;
    })
  })
};
