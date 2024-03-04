//检测api登录是否有token中间件

const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')

module.exports = (req,res,next) =>{
	let token = req.get('token')

	if(!token){
		res.json({
			code:3002,
			msg:'没有 token',
			data:null
		})
		return
	}

	jwt.verify(token,secret,(err,data)=>{
		if(err){
			res.json({
				code:3001,
				msg:'token校验失败',
				data:null
			})
			return
		}
		req.user = data //保存用户信息  其实req.session 和 req.body 就是中间件放入的属性
		console.log(data)//根据ranran解析出的用户数据
						//		{
						//	  		username: '3',
						//		  id: '65e43c51bd1faf4a3d1ad0c5',
						//		  iat: 1709466804,
						//		  exp: 1709467404
						//		}
		
	})
	next()
}