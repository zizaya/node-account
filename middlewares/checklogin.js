//检测登录是否有id的中间件
module.exports =  (req,res,next)=>{
	if(!req.session._id){
		res.redirect('/login')
		return
	}
	next()
}