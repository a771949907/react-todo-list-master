var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
app.use("/", express.static(path.join(__dirname ,'../html/')));

var serve;

module.exports = {
    startSever : function () {
        sever = http.createServer(app).listen('3000');
    },
    stopSever: function () {
        sever && sever.close();
    }
}