var express = require('express');
var http = require('http');


var argv = require('optimist').argv;
var buildDir = argv.buildDir || require('../grunt-config/buildDir.js')();

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();


var path = require('path');

var app = module.exports = express();

var backend;

if (argv.host) {
    backend = {
        host: argv.host,
        port: argv.port|| '8080'
    }
} 
else {
    backend = {
        'host': '127.0.0.1',
        'port': '8080'
    };
}

function interceptWriteHead(response) {
    response.oldWriteHead = response.writeHead;
    response.writeHead = function(statusCode, headers) {
        response.oldWriteHead(transformStatusCodeIfNecessary(statusCode), headers);
    };
}

app.set('port',7000);

var appPath = '/';
app.use(appPath, express.static(buildDir));

var timeout = 0; // increase to reproduce race condition bug between users.getCurrent and configService.getFeatures

app.get(appPath+'locale/en-us.json', function(req, res) {
    setTimeout(function() {
        res.sendfile(__dirname + '/node/mock/features.json');
    }, timeout);
});


var handle = function(req, res) {
    
    function continueAhead() {
        interceptWriteHead(res);

        proxy.web(req, res, {target: {host: backend.host, port: backend.port}}, function(e) {
            console.log('ERROR', e);
        });
    }
    //Do some pre-requisite actions on request
    //...

    //Then keep processing request
    continueAhead();

};

app.all('', handle);

http.createServer(app).listen(app.get('port'), function() {
    console.log('http://localhost:%s%s', app.get('port'), appPath);
    console.log('restApi - %s:%s', backend.host, backend.port);
    console.log('building from ', buildDir);
});

process.on('SIGTERM', function() {
    process.exit();
});

if (process.platform === 'win32') {
    require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    }).on('SIGINT', function() {
        process.emit('SIGINT');
    });
}

process.on('SIGINT', function() {
    process.exit();
});
