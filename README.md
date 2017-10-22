## 备注：
### express
官网：http://www.expressjs.com.cn/

1. bodyParser用于解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理。

【深入解读】

因为新版的express中不包含bodyparser，需要我们单独安装bodyparser。

解决方案：

使用npm install body-parser安装body-parser，然后在app.js中加载body-parser模块

> var bodyParser = require('body-parser')，把app.use(express.bodyParser())替换成app.use(bodyParser.urlencoded({extended:false})),这样就ok了。

但是还有一点要注意，在用post提交数据时需要把参数extended:false改为extended:true，否则会报错。

报错原因：因为通常post内容的格式为application/x-www-form-urlencoded，因此要用下面的方式来使用：

app.use(require('body-parser').unlencoded({extended:true}))

2. Request是一个简化的http客户端，它和Python的request库很像。这个库比默认的http 模块更好用，多年来被开源社区作为开发首选。

此外，重点关注一下Axios —— （Vue2.0 推荐使用）
Axios是一个基于promise的HTTP客户端，可以用于浏览器和Node.js。在处理需要更复杂的事件链的代码时，使用Promises具有很大的优势。 编写异步代码可能会令人困惑，而Promises是这个问题的几种解决方案之一。 它们甚至被用在其它语言中，比如Swift。

3. Async
Async是一个流程控制工具包，提供了直接而强大的异步功能。基于Javascript为Node.js设计，同时也可以直接在浏览器中使用。
Async提供了大约20个函数，包括常用的 map, reduce, filter, forEach 等，异步流程控制模式包括，串行(series)，并行(parallel)，瀑布(waterfall)等。

[node js 异步执行流程控制模块Async介绍](http://blog.csdn.net/jbboy/article/details/37667809)

4. 模板引擎 handlebars

`npm install hbs express-handlebars --save`

HTML编码:在handlebars里，{{expression}}会返回一个经过编码的HTML，如果你不希望被编码，可以使用{{{
```html
<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{{body}}}
  </div>
</div>
```
[Handlebars.js 中文文档](http://keenwon.com/992.html)
一般express默认安装jade，但也可以根据个人情况安装其他的模板引擎。

[官网文档](http://www.expressjs.com.cn/guide/using-template-engines.html)

5. 设置静态文件目录
新建public文件夹，再接着新建css、js文件夹放置静态文件；

选择bootstrap3 入门级模板替换layout.hbs
```js
app.use(express.static(__dirname + '/public'));
```
[Express细节探究(1)——app.use(express.static)](http://www.cnblogs.com/A-dam/p/5053299.html)

6. 信息发送与存储
`npm install express-session express-flash connect-mongo --save`

### express-session
session运行在服务器端，当客户端第一次访问服务器时，可以将客户的登录信息保存。 
当客户访问其他页面时，可以判断客户的登录状态，做出提示，相当于登录拦截。 
session可以和redis或者数据库等结合做持久化操作，当服务器挂掉时也不会导致某些客户信息（购物车）丢失。 

[nodesj中 中间件express-session的理解](http://blog.csdn.net/u012679583/article/details/50510717)

### express-flash
Flash Messages for your Express Application
Flash is an extension of connect-flash with the ability to define a flash message and render it without redirecting the request.

简介：
flash 是 session 中一个用于存储信息的特殊区域。消息写入到 flash 中，在跳转目标页中显示该消息。flash 是配置 redirect 一同使用的，以确保消息在目标页面中可用。
flash 可用于一次性的消息提示，比如注册，登录页面，当你再次刷新时，flash就没有提示消息了。

[github链接](https://github.com/RGBboy/express-flash)

[connect-flash 用法详解](http://yunkus.com/connect-flash-usage/)

### connect-mongo模块
简述：
    session数据存储空间一般是在内存中开辟的，那么在内存中的session显然是存在极大的数据丢失的隐患的，比如系统掉电，所有的会话数据就会丢失，如果是证券交易所那么这种后果的严重性可想而知。所以为了解决这个问题可以将session持久化保存，比如保存到数据库。那么这篇博客就是介绍session持久化保存到mongoDB的工具connect-mongo。
    
[详细描述](http://blog.csdn.net/u012810020/article/details/54379305)

将Session存放到MongoDB

在MongoDB中是这样存放Session的， 使用 connect-mongo  即用来将Express中的Session持久化到Mongodb的一个中间件，它也可以在connect  上使用。

```js
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: 'foo',
    store: new MongoStore(options)
}));
```