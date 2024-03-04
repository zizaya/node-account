var express = require('express');
var router = express.Router();

const AccountModel = require('../../models/AccountModel')
const moment = require('moment')
const checkSession = require('../../middlewares/checklogin')


//router.use(checkSession) //不能这样用，否则其他页面的router也会应用，不是单独的router

/* GET home page. */
router.get('/',function(req, res, next) {
  res.redirect('/account')
});

//账单列表
router.get('/account', checkSession,function(req, res, next) {
	AccountModel.find().sort({time:-1}).then((data)=>{
		res.render('account', { accounts:data,moment });
	},err=>{

	})
  
});

//提交账单
router.post('/account', checkSession,function(req, res, next) {
	
	AccountModel.create({
		...req.body,
		time:moment(req.body.time).toDate()
	}).then(data=>{
		res.render('message', { message: 'success' ,url:"/account"});
	},err=>{
		res.render('message', { message: 'fail' ,url:"/account"});
	})
  
});

//提交账单页面
router.get('/account/create', checkSession,function(req, res, next) {

  res.render('create');
});

//删除账单
router.get('/account/:id', checkSession,function(req, res, next) {
	console.log(req.params.id)
	AccountModel.deleteOne({_id:req.params.id}).then(data=>{
		res.render('message', { message: 'success delete' ,url:"/account"});
	},err=>{
		res.render('message', { message: 'fail delete' ,url:"/account"});
	})
  
});

module.exports = router;
