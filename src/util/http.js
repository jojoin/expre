

var http = require('http')
  , https = require('https')
  , qs = require('querystring')
  , urlmod = require('url')
  ;


// http 请求
exports.wget = function(url, para, callback, reqparam){
    callback = callback || function(){};
    var hp = http;
    if(para){
        var x = url.indexOf('?')>-1 ? '&' : '?';
        url = url+x+qs.stringify(para);
    }
    if(url.substr(0,8)=='https://'){
        hp = https;
    }
    // log(url);
    var urlobj = urlmod.parse(url);
    for(var r in reqparam){
        urlobj[r] = reqparam[r];
    }
    // log(urlobj);
    hp.get(urlobj, function(res) {
        var size = 0;
        var chunks = [];
        res.on('data', function(chunk){
            size += chunk.length;
            chunks.push(chunk);
        });
        res.on('end', function(){
            var data = Buffer.concat(chunks, size);
            // console.log(data.toString());
            callback(null, data.toString());
        });
    }).on('error', function(e) {
        // console.log("Got error: " + e.message);
        callback(e);
    });
}

