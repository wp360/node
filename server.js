const express = require('express');// 引入Express
const bodyParser = require('body-parser');// 引入处理post数据的模块
const morgan = require('morgan');// 命令行log显示
const request = require('request');// 发起HTTP请求
const async = require('async'); // 异步执行流程控制
const expressHbs = require('express-handlebars');// 模板引擎
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');

const app = express();

//mongodb://<dbuser>:<dbpassword>@ds129315.mlab.com:29315/mvpnewsletter
app.engine('.hbs',expressHbs({ defaultLayout: 'layout',extname: '.hbs'}));
app.set('view engine','hbs');// 设置模板引擎
app.use(express.static(__dirname + '/public'));//设置静态文件目录
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(session({
    resave: true, // (是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。默认为true。
    saveUninitialized: true, // 初始化session时是否保存到存储。默认为true
    secret: "secretkey", // 一个String类型的字符串，作为服务器端生成session的签名。 
    store: new MongoStore({ url: 'mongodb://root:abc123@ds129315.mlab.com:29315/mvpnewsletter' })
}));
app.use(flash());

// mailchimp注册账号，获取API权限
// 3336e0cf91b5a9e8bf2c3aa18d71aad3-us15
// https://us15.api.mailchimp.com/3.0/lists/e21a2d4e84/members

app.route('/').get((req, res, next) => {
    //res.json("欢迎进入首页");
    //res.render('layouts/layout');
    res.render('main/home',{message: req.flash('success')});
}).post((req,res,next) => {
    //获取用户的email
    //console.log(req.body.email);
    request({
        url: 'https://us15.api.mailchimp.com/3.0/lists/e21a2d4e84/members',
        method: 'POST',
        headers: {
            'Authorization': 'randomUser 3336e0cf91b5a9e8bf2c3aa18d71aad3-us15',
            'Content-Type': 'application/json'
        },
        json:{
            'email_address': req.body.email,
            'status': 'subscribed'
        }
    },function(err,response,body){
        if(err){
            console.log(err);
        }else{
            //console.log("成功发送");
            req.flash('success','你的邮箱已经提交成功！');
            res.redirect('/');
        }
    });
});

// Session = memory store,if you want to perserve the data for future use
// Data store = mongodb, redis

app.listen(3030,(err) => {
    if(err) {
        console.log(err);
    }else {
        console.log('服务运行，端口3030');
    }
});