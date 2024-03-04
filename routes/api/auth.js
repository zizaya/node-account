var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const UserModel = require('../../models/UserModel')
const {secret} = require('../../config/config')

const md5 = require('md5')

//登录api
router.post('/login', function(req, res, next) {
	UserModel.findOne({
		...req.body,
		password:md5(req.body.password)
	}).then(data=>{
		if(data){
		console.log(data)
			//生成token
			let token = jwt.sign({
				username:data.username,
				id:data._id
			},secret,{
				expiresIn:600
			})

			res.json({
				code:0000,
				msg:'登录成功',
				data:{...data,token},
			})
			
		}else{
			
			res.json({
				code:2001,
				msg:'fail',
				data:null
			})

		}
		
	},err=>{
		res.json({
			code:2001,
			msg:'fail',
			data:null
		})
	})
});


module.exports = router;
