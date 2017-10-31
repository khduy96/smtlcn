var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var ArticlesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lv: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default : Date.now,
    required: true,
  },
  volumeId: {
    type: Number,
    trim: true
  },
  statusId: {
    type: Number,
    trim: true
  },
  pdf:{
      type: String
  },
  description: {
    type: String,
    required: true,
  },
  vote : {
      type:Number,
  },
  tgemail : {
    type: String,
    required:true
  }
});

var Articles = mongoose.model('Articles', ArticlesSchema);
module.exports = Articles; 

module.exports.createArticle = function(newArticle, callback){
  newArticle.save(callback);
}