var express = require('express');
var router = express.Router();

const UserModel = require('../../models/UserModel')

const md5 = require('md5')

//注册页面渲染
router.get('/reg', function(req, res, next) {
  res.render('auth/reg');
});

//提交注册页面
router.post('/reg', function(req, res, next) {
	console.log(req.body)

	UserModel.create({
		...req.body,
		password:md5(req.body.password)
	}).then(data=>{
		res.render('message',{message:'注册成功',url:"/login"});
	},err=>{
		res.render('message',{message:'注册失败',url:"/reg"});
	})
  
});
//登录页面渲染
router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

//提交登录页面
router.post('/login', function(req, res, next) {
	UserModel.find({
		...req.body,
		password:md5(req.body.password)
	}).then(data=>{
		if(data.length){
			req.session._id = data[0]._id
			res.render('message',{message:'登录成功',url:"/account"});
			
		}else{
			
			res.render('message',{message:'登录失败',url:"/login"});

		}
		
	},err=>{
		res.render('message',{message:'登录失败',url:"/login"});
	})
});

//登出
//post方式防止CSRF跨站请求伪造，其他网站请求相同链接的时候是get方法，无法影响，否则get会自动带上cookie的
router.post('/logout', function(req, res, next) {
	req.session.destroy(()=>{
		res.redirect('/login')
	})
});

module.exports = router;
