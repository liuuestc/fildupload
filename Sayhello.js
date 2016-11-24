/**
 * Created by Administrator on 2016/11/24.
 */
var fs = require('fs');
var readline = require('readline');
var iconv = require('iconv-lite');
function callback(err,files){
    if (!err){
        var data = iconv.decode(files,'gbk').split('\n');
        var  length = data.length;
        for (var i =1 ;i < length-1; i++){
            var tmp = data[i].split(',');
            console.log(tmp[0]+tmp[1]+tmp[2])
        }

    }

    else console.log('error!');
}

fs.readFile('abc.csv',callback);
console.log("File Reading!");