## 操作步骤：
1. 安装
`npm init`  生成package.json

`npm i --save express`  安装express

`npm i --save mongoose` 安装mongoose

`npm i --save-dev babel-cli babel-preset-es2015 babel-preset-stage-0`

`npm i --save body-parser`

2. babel的使用
[中文文档](https://babeljs.cn/docs/usage/cli/)

3. mongodb的使用
首先，安装。然后开启 `mongo`，项目文件夹下新建 `mkdir mongodata`（数据文件夹）；再者，`mongod --bdpath=mongodata/`
### 命令行下运行 MongoDB 服务器
> 为了从命令提示符下运行 MongoDB 服务器，你必须从 MongoDB 目录的 bin 目录中执行 mongod.exe 文件。
`当前文件夹>mongod --dbpath K:\MongoDB\mongodb\data\db`
### mongoose的连接
models > crmModel.js > 建立Schema

controllers > crmController.js > 数据存储

routes > crmRoutes.js > post方法修改
```js
    .post((req,res) =>
        res.send('POST request successful!!')
    );
    替换为
    import { addNewContact } from '../controllers/crmController';
    .post(addNewContact);
```
4. PostMan的使用
POST > localhost:3000/contact (url) 

选择 x-www-form-urlencoded 、Body 添加对应内容（键值）

添加完后，send。获得：
```js
{
  "__v": 0,
  "firstName": "Bob",
  "lastName": "Bao",
  "email": "me@qq.com",
  "company": "Home",
  "phone": 13888888888,
  "_id": "5a1119e8faa9d11fb4e75bf2",
  "created_date": "2017-11-19T05:43:04.059Z"
}
```
5. Get方法
```js
controllers > crmController.js 添加方法并导出 》》》
export const getContacts = (req,res) => {
    Contact.find({},(err,contact) => {
        if(err){
            res.send(err);
        }
        res.json(contact);
    });
};
routes > crmRoutes.js > get方法调整 》》》
const routes = (app) => {
    app.route('/contact')
    .get((req,res,next) => {
        //middleware
        console.log(`Request from: ${req.orginalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
    },(req,res,next) => {
        res.send('GET request successful!!');
    })
    替换为：
import { getContacts } from '../controllers/crmController';
const routes = (app) => {
    app.route('/contact')
    .get((req,res,next) => {
        //middleware
        console.log(`Request from: ${req.orginalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
    },getContacts)
```
6. Put方法
```js
controllers > crmController.js 添加方法并导出 》》》
export const updateContact = (req,res) => {
    Contact.findOneAndUpdate({_id: req.params.contactId},req.body,{new:true},(err,contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};
routes > crmRoutes.js > put方法调整 》》》
    .put((req,res) =>
        res.send('PUT request successful!!')
    )
    替换为：
    import { updateContact } from '../controllers/crmController';
    .put(updateContact)
```
7. Delete方法
```js
controllers > crmController.js 添加方法并导出 》》》
export const deleteContact = (req,res) => {
    Contact.remove({_id: req.params.contactId},(err,contact) => {
        if (err) {
            res.send(err);
        }
        res.json({message: '数据删除成功！'});
    });
};
routes > crmRoutes.js > delete方法调整 》》》
    .delete((req,res) =>
        res.send('DELETE request successful!!')
    );
    替换为：
    import { deleteContact } from '../controllers/crmController';
    .delete(deleteContact)
```
8. git 远程分支上传
```js
git remote add  origin  https://github.com/wp360/node.git

git checkout -b crm

git status

git add .

git commit -m "add file"

git push

git push --set-upstream origin crm
```