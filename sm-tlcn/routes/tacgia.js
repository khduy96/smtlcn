var express = require('express');
var router = express.Router();

var Employee = require('../models/employees');
var Article = require('../models/articles');

/* GET login page. */
router.get('/suabai', function(req, res) {
  res.render('tacgia_suabai', { title: 'SM-TLCN' });
});
router.get('/', function(req, res) {
	Employee.getEmployeeByEmail("khuongduy@gmail.com",function(err, employee){
    if(err) throw err;
			res.render('tacgia',{
        title: 'SM-TLCN',
				_email:employee.email,
				_pass:employee.password,
        _birthday:employee.birthday,
        _phone:employee.phone,
        _address:employee.address,
        _sex:employee.sex,
        _cpn:employee.cpn,
        _name:employee.name
			});
	});
});
router.post('/dangbai', function(req, res){
	var _lv = req.body.lv;
	var _title = req.body.title;
	var _mysub = req.body.mysub;
	var _tgemail = req.body.tgemail;
  // Validation
  req.checkBody('tgemail', 'Email is not valid').isEmail();
  var errors = req.validationErrors();
  
    if(errors){
      res.render('tacgia',{
        errors:errors
      });
    } else {
      var newArticle = new Article({
        lv: _lv,
        title:_title,
        description: _mysub,
        tgemail: _tgemail
      });
  
      Article.createArticle(newArticle, function(err, article){
        if(err) throw err;
        console.log(article);
      });
      req.flash('success_msg', 'You are registered and can now login');
      res.redirect('/tacgia');
    }
});

module.exports = router;
