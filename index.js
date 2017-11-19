import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb',{
    useMongoClient: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

routes(app);

// 静态文件
app.use(express.static('public'));

app.get('/',(req,res) =>
    res.send(`运行端口${PORT}`)
);

app.listen(PORT, () =>
    console.log(`服务端口${PORT}`)
);