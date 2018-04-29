var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
var router = require('./router');
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('./DBConfig');
var SQLForm = require('./SQLForm');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

/**
 * 数据库查询
 * @param sql
 * @returns {Promise<any>}
 * @constructor
 */

const Model = (sql, params) => {
    return new Promise((resolve, reject)=>{
        pool.getConnection(function (err, connection) {
            connection.query(sql,params, function (err, rows) {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
                connection.release();//释放链接
            });
        });
    });
};

//发表/新增文章
app.post('/article/report',async function (req,res,next) {
    let reportSqlParams = [req.body.title,req.body.content,req.body.secret,Date.now()];
    try {
        let results = await Model(SQLForm.ArticleSQL.report,reportSqlParams);
        res.json({
            success:true,
            msg:'新增成功!',
            data: results
        });
    } catch (err) {
        console.log('[SELECT ERROR] - ',err.message);
    }
});
//编辑文章
app.post('/article/edit',async function (req,res,next) {
    let reportSqlParams = [req.body.title,req.body.content,req.body.secret,Date.now(),req.body.art_id];
    try {
        let results = await Model(SQLForm.ArticleSQL.edit,reportSqlParams);
        res.json({
            success:true,
            msg:'保存成功!',
            data: results
        });
    } catch (err) {
        console.log('[SELECT ERROR] - ',err.message);
    }
});

//获取文章列表
app.post('/article/getList',async function (req,res,next) {
    let pageIndex = req.body.pageIndex||1;
    let pageSize = req.body.pageSize||10;
    let reportSqlParams = [(pageIndex-1)*pageSize,pageSize];
    try {
        let results = await Model(SQLForm.ArticleSQL.getArticleList,reportSqlParams);
        res.json({
            success:true,
            msg:'获取成功!',
            data: results
        });
    } catch (err) {
        console.log('[SELECT ERROR] - ',err.message);
    }
});


//删除文章
app.post('/article/delete',async function (req,res,next) {
    let reportSqlParams = [req.body.art_id];
    try {
        let results = await Model(SQLForm.ArticleSQL.delete,reportSqlParams);
        res.json({
            success:true,
            msg:'删除成功!',
            data: results
        });
    } catch (err) {
        console.log('[SELECT ERROR] - ',err.message);
    }
});

//设为私密
app.post('/article/secret',async function (req,res,next) {
    let reportSqlParams = [1,req.body.art_id];
    try {
        let results = await Model(SQLForm.ArticleSQL.secret,reportSqlParams);
        res.json({
            success:true,
            msg:'设置成功!',
            data: results
        });
    } catch (err) {
        console.log('[SELECT ERROR] - ',err.message);
    }
});
//设为公开
app.post('/article/unsecret',async function (req,res,next) {
    let reportSqlParams = [0,req.body.art_id];
    try {
        let results = await Model(SQLForm.ArticleSQL.secret,reportSqlParams);
        res.json({
            success:true,
            msg:'设置成功!',
            data: results
        });
    } catch (err) {
        console.log('[SELECT ERROR] - ',err.message);
    }
});
//置顶
app.post('/article/top',async function (req,res,next) {
    let reportSqlParams = [1,req.body.art_id];
    try {
        let results = await Model(SQLForm.ArticleSQL.top,reportSqlParams);
        res.json({
            success:true,
            msg:'置顶成功!',
            data: results
        });
    } catch (err) {
        console.log('[SELECT ERROR] - ',err.message);
    }
});
//获取指定文章
app.post('/article/getArticleById',async function (req,res,next) {
    let reportSqlParams = [req.body.art_id];
    try {
        let results = await Model(SQLForm.ArticleSQL.getArticleById,reportSqlParams);
        res.json({
            success:true,
            msg:'获取成功!',
            data: results[0]
        });
    } catch (err) {
        console.log('[SELECT ERROR] - ',err.message);
    }
});









/*//发表文章
app.post('/article/report',async function (req,res,next) {
    let reportSqlParams = [req.body.title,req.body.content,req.body.secret,Date.now()];
    pool.getConnection(function (err, connection) {
        connection.query(SQLForm.ArticleSQL.report,reportSqlParams, function (err, rows) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }else{
                res.json(
                    {
                        success:true,
                        msg:'发表成功!',
                        data:rows
                    }
                );
            }
            connection.release();//释放链接
        });
    });
});*/




app.use('/router',router);

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
