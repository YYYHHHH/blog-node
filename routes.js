var express = require('express');
var app = express();
app.use(express.static('public'));
var router = require('./router');
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('./DBConfig');
var userSQL = require('./usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use('/router',router);
// 响应一个JSON数据
app.get('/addUser',function (req, res, next) {


    var sql = 'SELECT * FROM websites';
//查
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }else{
                res.send(JSON.stringify(
                    {
                        success:true,
                        msg:'请求成功',
                        data:rows
                    }
                ));
            }
            connection.release();//释放链接
        });
    });
});

//中间件next()和next('route')的用法
app.get('/nextRoute',function (req,res,next) {
    console.log('index');
    next();
    //next('route');
},function (req,res,next) {
    res.send('next')
});
app.get('/nextRoute',function (req,res,next) {
    res.send('next route!');
});
//↑

app.get("*", function(request, response) {
    response.end("404!");
});
app.listen(8081, function () {
    console.log("请访问localhost:8081")
});
