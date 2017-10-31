var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var EmployeesSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique : true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  address:{
    type : String
  },
  phone : {
      type : String
  },
    role:{
      rid:{
        type:Number,
        require : true,
        trim : true
      },
      rname:{
        type:String,
        require : true 
      }
    },
  sex: {
      type : Boolean,
      default : true
  },
  cpn : {
      type : String
  },
  name : {
      type : String
  }
});

var Employees = mongoose.model('Employees', EmployeesSchema);
module.exports = Employees;
if(Employees) console.log("3333333333");
else console.log("44444444444");
//
module.exports.getEmployeeByEmail = function(email, callback){
  var query = {email: email};
  console.log("555555 :"+query);
	Employees.findOne(query, callback);
}

module.exports.getEmployeeById = function(id, callback){
	Employees.findById(id, callback);
}