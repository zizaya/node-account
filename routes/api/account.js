var express = require('express');
var router = express.Router();

const AccountModel = require('../../models/AccountModel')
const moment = require('moment')

const checkLoginToken = require('../../middlewares/checkLoginToken')

//router.use(checkLoginToken) 全局使用会影响/login，一直跳没有token， 不能全局使用
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//账单列表api
router.get('/account', checkLoginToken, function(req, res, next) {
	AccountModel.find().sort({time:-1}).then((data)=>{
		res.json({
			code:0000,
			msg:'success',
			data:data
		})
	},err=>{
		res.json({
			code:1001,
			msg:'fail',
			data:null
		})
	})
  
});
//提交账单api
router.post('/account', function(req, res, next) {
	
	AccountModel.create({
		...req.body,
		time:moment(req.body.time).toDate()
	}).then(data=>{
		res.json({
			code:0000,
			msg:'success',
			data:data
		})
	},err=>{
		res.json({
			code:1002,
			msg:'fail',
			data:null
		})
	})
  
});

//删除账单api
router.delete('/account/:id', function(req, res, next) {
	console.log(req.params.id)
	AccountModel.deleteOne({_id:req.params.id}).then(data=>{
		res.json({
			code:0000,
			msg:'success',
			data:{}
		})
	},err=>{
		res.json({
			code:1003,
			msg:'fail',
			data:null
		})
	})
  
});
//获取单条账单api
router.get('/account/:id', checkLoginToken, function(req, res, next) {
	console.log(req.params.id)
	AccountModel.findById(req.params.id).then(data=>{
		res.json({
			code:0000,
			msg:'success',
			data:data
		})
	},err=>{
		res.json({
			code:1004,
			msg:'fail',
			data:null
		})
	})
  
});
//更新账单api
router.patch('/account/:id', function(req, res, next) {
	console.log(req.params.id)
	AccountModel.updateOne({_id:req.params.id},{...req.body}).then(data=>{
		
		return AccountModel.findById(req.params.id)
	}).then(data=>{
		res.json({
			code:0000,
			msg:'success',
			data:data
		})
	}).catch(err=>{
		res.json({
			code:1005,
			msg:'fail',
			data:null
		})
	})
  
});

module.exports = router;
