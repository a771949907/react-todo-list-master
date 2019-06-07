/**
 * Created by njz on 17/2/11.
 */
var http = require('http');
var express = require('express');
var backstop = require('backstopjs');
var path = require('path');
var app = express();
app.use("/", express.static(path.join(__dirname ,'../html/')));

// 创建服务端
var sever = http.createServer(app).listen('3000', function() {
    //执行backstop
    backstop('test').then(function () {
        sever.close();
    });
});