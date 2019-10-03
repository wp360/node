## To-Do App
1. 初始化项目
2. MongoDB Atlas的使用
3. html静态页面
4. express启动服务
5. POST发送请求
6. 连接数据库
* Connecting a Node App to a Database
```js
// server.js
app.post("/create-item", function (req, res) {
  db.collection("items").insertOne({text: req.body.item}, function(){
    res.send("Thanks for submitting the form.")
  })
})
```
* 安装mongodb
`npm install mongodb`
> Cluster0 >> CONNECT >> Whitelist your connection IP address >> 点击Add a Different IP Address按钮
```
IP Address

0.0.0.0/0

点击Add IP Adress按钮
```
* Create a MongoDB User
```
Username          Password

todoAppUser       admin123

点击Create MongoDB User按钮

*** copy ***
mongodb+srv://todoAppUser:<password>@cluster0-nzih8.mongodb.net/test?retryWrites=true&w=majority
```
* Create Database
```
数据库名称 TodoApp
文档名称   items
```