const http = require('http');
const server = http.createServer((req,res)=> {
    console.log(req.url);
    if(req.url === '/') {
        res.write('Hello Node');
        res.end();
    }

    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});

// server.on('connection', (socket)=> {
//     console.log('新连接...');
// });

server.listen(3001);

console.log('Listening on port 3001...');