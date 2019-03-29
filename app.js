function sayHello(name) {
    console.log('Hello ' + name);
}

sayHello('Mosh Hamedani');

// global 全局对象
var message = '';
console.log(global.message); // undefined

// modules 模块
console.log(module);

// Loading a Module 加载模块
var logger = require('./logger');
console.log(logger);
logger.log('message');

// jshint app.js

// Module Wrapper Function 模块包装函数

// Path Module 路径模块

// 常用内建模块
// File System、HTTP、OS、Path、Process、Query Strings、Stream

const path = require('path');
var pathObj = path.parse(__filename);
console.log(pathObj);

// 操作系统模块的使用  OS Module
const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('总内存: ' + totalMemory);
console.log('空余内存: ' + freeMemory);
// console.log(`Total Memory: ${totalMemory}`); // ES6

// File System Module 文件系统模块
const fs = require('fs');
// const files = fs.readdirSync('./');
// console.log(files);

fs.readdir('./', function(err, files) {
    if(err) console.log('Error', err);
    else console.log('Result', files);
});

// Events Module 事件模块 EventEmitter类 类的话首字母大写
const EventEmitter = require('events');
// const emitter = new EventEmitter();

// emitter.emit('messageLogged', {id: 1, url: 'http://example.com'}); // 用来发起一个事件

const Logger = require('./logger');
const logger = new Logger();

// Register a listener 注册一个监听器 参数为事件名称，回调函数
logger.on('messageLogged', (arg)=> {
    console.log('监听到', arg);
});

logger.log('message');

// 注意顺序，监听放在发起请求上面

// Event Arguments 事件参数

// Extending EventEmitter 扩展事件参数

// HTTP Module HTTP模块