// Creating a Module 创建一个模块
const EventEmitter = require('events');

var url = 'http://example.com';

// function log(message) {
//     // Send an HTTP request
//     console.log(message);

//     emitter.emit('messageLogged', {id: 1, url: 'http://example.com'}); // 用来发起一个事件
// }

// module.exports.log = log;

// 在你的模块中，你可以导出对象或者单一函数 module.exports = log;

class Logger extends EventEmitter{
    log(message) {
        // Send an HTTP request
        console.log(message);

        this.emit('messageLogged', {id: 1, url: 'http://example.com'}); // 用来发起一个事件
    } 
}

module.exports = Logger;