// const startupDebugger = require('debug')('app:startup');
const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
// const logger = require('./middleware/logger');
const home = require('./routes/home');
const courses = require('./routes/courses');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

// app.get()
// app.post()
// app.put()
// app.delete()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);
app.use('/api/courses', courses);

// 配置
console.log('Application Name: ' + config.get('name'));
console.log('Mail Sever: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

// app.use(logger);
// SET / export DEBUG=app:startup  app:* (*通配符)
if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    // console.log('Morgan enabled...');
    // startupDebugger('Morgan enabled...');
    debug('Morgan enabled...');
}

// DB work...
dbDebugger('连接数据库...');

app.use((req,res,next) => {
    console.log('登录中...');
    next();
});

app.use((req,res,next) => {
    console.log('授权中...');
    next();
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`监听端口${port}`));