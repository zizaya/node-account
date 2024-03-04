var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var AccountRouter = require('./routes/web/account');
var AccountApi = require('./routes/api/account');
var UserRouter = require('./routes/web/auth');
var UserApi = require('./routes/api/auth');
//seesion操作的两个包
const session = require('express-session')
const MongoStore = require('connect-mongo')

const {DBHOST,DBPORT,DBNAME} = require('./config/config')

var app = express();

// view engine setup 设置模板引擎ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

//解析req.body中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cookie中间件
app.use(cookieParser());

//设置静态资源
app.use(express.static(path.join(__dirname, 'public')));


//设置session中间件,放在路由前
app.use(session({
	name:'sid',
	secret:'zhangzhen',
	saveUninitialized:false,
	resave:true,
	store:MongoStore.create({
		mongoUrl:`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
	}),
	cooki:{
		httpOnly:true,
		maxAge:1000 * 300
	}
}))

//路由
app.use('/', AccountRouter);
app.use('/', UserRouter);
app.use('/api', AccountApi);
app.use('/api', UserApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send('not found 404')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
